import {
  synchronize,
  SyncPullArgs,
  SyncPushArgs,
} from "@nozbe/watermelondb/sync";
import throttle from "lodash/throttle";
import { IHoot, IUser } from "../../../shared";
import { query } from "../../utils/Axios/query";
import { database } from "../index";
import { User } from "../models/UserModel";

export const watermelonSync = throttle(
  async (userData: IUser, lastUpdateTime?: number) => {
    await synchronize({
      database,
      sendCreatedAsUpdated: true,
      pullChanges: async ({ lastPulledAt }: SyncPullArgs) => {
        lastUpdateTime = lastUpdateTime || lastPulledAt || 1;
        const privateKey = userData.appPrivateKey;
        const myUserId = userData._id;
        const localUsers = await database.collections
          .get<User>("users")
          .query()
          .fetch();
        const hootQuery = {
          select: {
            "?tweets": [
              {
                "*": {
                  _compact: true,
                },
              },
              {
                "parentTweet": [
                  {
                    "*": {
                      _compact: true,
                    },
                  },
                  {
                    "tweet/_parentTweet": [
                      {
                        _as: "retweets",
                      },
                    ],
                  },
                  {
                    "tweet/_replies": [
                      {
                        "*": {
                          _compact: true,
                        },
                      },
                      {
                        _as: "threadParent",
                      },
                    ],
                  },
                ],
              },
              {
                "tweet/_parentTweet": [
                  {
                    _as: "retweets",
                  },
                ],
              },
              {
                "tweet/_replies": [
                  {
                    "*": {
                      _compact: true,
                    },
                  },
                  {
                    _as: "threadParent",
                  },
                ],
              },
            ],
          },
          where: [
            ["?var", "connections/to", "?to"],
            ["?var", "connections/from", myUserId],
            ["?var", "connections/status", "success"],
            ["?tweets", "tweet/auther", "?to"],
            ["?tweets", "tweet/createdAt", "?createdAt"],
            { filter: [`(> ?createdAt  ${lastPulledAt || 0})`] },
          ],
        };
        const newsFeedsRes = await query({
          myQuery: hootQuery,
          privateKey,
        });
        const newsFeeds: IHoot[] = newsFeedsRes.data.reduce((acc, hoot) => {
          const flattedHoots = [hoot];
          if(hoot.parentTweet){
            flattedHoots.push(hoot.parentTweet);
          }
          if(hoot.threadParent){
            flattedHoots.push(hoot.threadParent[0]);
          }
          return [...acc,...flattedHoots];
        },[]);
        let userIds = Array.from(
          new Set([
            ...newsFeeds.map((hoot) => +hoot.auther._id),
            ...localUsers.map((user) => +user.id),
          ])
        );
        const userQuery = {
          select: {
            "?var": [
              "status",
              {
                to: [
                  "*",
                  {
                    _compact: true,
                  },
                ],
              },
            ],
          },
          where: [
            ["?var", "connections/from", userData._id],
            ["?var", "connections/to", "?toUser"],
            {
              filter: [
                `(or ${userIds
                  .map((userId) => `(= ?toUser ${userId})`)
                  .join(" ")})`,
              ],
            },
          ],
        };
        const usersRes = await query({
          myQuery: userQuery,
          privateKey,
        });
        const users: IUser[] = usersRes.data;
        return {
          changes: {
            hoots: {
              updated: newsFeeds.map((hoot) => {
                return {
                  id: hoot._id.toString(),
                  retweetsNumber: (hoot.retweets || []).length || 0,
                  repliesNumber: (hoot.replies || []).length || 0,
                  isFavorite:
                    (hoot.favorites || []).filter(({ _id }) => _id === myUserId)
                      .length > 0,
                  isRetweeted:
                    (hoot.retweets || []).filter(
                      ({ auther }) => auther?._id === myUserId
                    ).length > 0,
                  favoritesNumber: (hoot.favorites || []).length || 0,
                  user: hoot.auther._id.toString(),
                  threadParent: hoot?.threadParent[0]?._id.toString(),
                  parentTweet: hoot?.parentTweet?._id.toString(),
                  text: hoot.text,
                  image: hoot.image,
                  avatar: hoot.avatar,
                };
              }),
              created: [],
              deleted: [],
            },
            users: {
              updated: users.map(
                ({
                  to: { _id, auth, ...rest },
                  _id: connectionId,
                  status: connectionStatus,
                }) => ({
                  id: _id.toString(),
                  connectionId,
                  connectionStatus,
                  ...rest,
                })
              ),
              created: [],
              deleted: [],
            },
          },
          timestamp: lastUpdateTime,
        };
        // return { changes: {}, timestamp: 1 };
      },
      pushChanges: async ({ changes }: SyncPushArgs) => {},
    });
  },
  10000,
  {
    trailing: true,
  }
);

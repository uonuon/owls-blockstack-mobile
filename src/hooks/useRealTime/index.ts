import { UserData } from "contexts";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { createStore } from "reusable";
import { io } from "socket.io-client";
import { useProfile } from "hooks";
import { IUser } from "shared";
import { queryFollowings } from "../../../shared/Queries";
import { arrayToObj, query } from "utils";
import { useRoute } from "@react-navigation/native";
import { User } from "src/db/models/UserModel";
import { database } from "src/db";
import { Hoot } from "src/db/models/HootsModel";
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

export const useRealTime = createStore(() => {
  const { userData } = useContext(UserData);
  const settersMap = {
    tweet: async ({ tempId, transactionID}) => {
      const hootsCollection = database.collections.get<Hoot>('hoots');
      await database.action(async () => {
      const hoot = await hootsCollection.find(tempId.toString());
      const des = hoot.prepareDestroyPermanently();
      const cre = hootsCollection.prepareCreate(h => {
        h._raw.id = transactionID.toString()
        h.retweetsNumber = hoot.retweetsNumber 
        h.repliesNumber = hoot.repliesNumber
        h.isFavorite = hoot.isFavorite
        h.isRetweeted = hoot.isRetweeted
        h.favoritesNumber = hoot.favoritesNumber
        h.user.id = hoot.user.id
        h.threadParent.id = hoot?.threadParent?.id
        h.parentTweet.id = hoot?.parentTweet?.id
        h.text = hoot.text
        h.image = hoot.image
      })
      await hoot.batch(des, cre)
    })
    },
    connections: async ({ transactionID, transactionFlake }) => {
      if (transactionFlake[0].from === userData?._id) {
        const currentUser: IUser = await query({
          myQuery: {
            selectOne: ["*"],
            from: transactionFlake[0].to,
          },
          privateKey: userData?.appPrivateKey,
        }).then((u) => u.data);
        await database.action(async () => {
          const userCollection = database.get<User>("users");
          const isFound = await userCollection.find(transactionFlake[0].to);
          if (!isFound) {
            await userCollection.create((user) => {
              user.connectionId = transactionID;
              user.publicKey = currentUser.publicKey;
              user.avatar = currentUser.avatar;
              user.isPrivate = currentUser.isPrivate;
              user.description = currentUser.description;
              user.id = currentUser._id.toString();
              user._id = currentUser._id;
              user.connectionStatus = transactionFlake[0].status;
              user.fullName = currentUser.fullName;
              user.username = currentUser.username;
              user.profile = currentUser.profile;
              user.hubUrl = currentUser.hubUrl;
            });
          }
        });
      }
    },
  };

  const cb = (
    eventData: {
      flakes: [];
      txns: {
        [x: string]: {
          status: number;
          error: string;
          tempids: { [x: string]: number };
        };
      };
    },
    lastEventTime: number
  ) => {
    const flakesArr = eventData.flakes;
    let flake;
    let error;
    let called;
    let transactionFlake;
    for (flake of flakesArr) {
      if (flake[1] === 106) {
        transactionFlake = JSON.parse(flake[2]).tx;
      }
      if (flake[1] === 109) {
        error = true;
      }
      if (flake[1] === 108) {
        called = true;
        const txId = JSON.parse(flake[2]);
        const setter = Object.keys(txId)[0].split("$")[0];
        const tempId = Object.keys(txId)[0].split("$")[1];
        const transactionID = Object.values(txId)[0];
        if (settersMap[setter]) {
          settersMap[setter]({
            transactionID,
            tempId,
            transactionFlake,
          });
        }
      }
    }
    if (!error && !called) {
      // Edit Operations
    }
  };
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === "active" && userData) {
        // re-activate syncing
      }
    },
    [userData]
  );
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (userData && appStateVisible === "active") {
      const socket = io("http://192.168.8.105:3000");
      socket.on("fluree_event", ({ data, lastEventTime }: any) => {
        cb(data, lastEventTime);
      });
      return () => {
        socket.off("fluree_event");
        socket.disconnect();
      };
    }
    return undefined;
  }, [userData, appStateVisible]);
});

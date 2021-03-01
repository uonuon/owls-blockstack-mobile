import { useCallback, useContext, useEffect, useState } from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IHoot, IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";

const authenticatorPrivateKey =
  "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a";
const authenticatorAuthId = "TfJecBZR7DzqD9hvQLYLrVKuHiUgKDceR8d";

export const useHoots = () => {
  const {userData} = useContext(UserData)
  const [userHoots, setUserHoots] = useState<IHoot[]>([])
  const [newsFeedHoots, setNewsFeedHoots] = useState<IHoot[]>([])
  const {
    setFailure,
    setLoading,
    setSuccess,
    success,
    failure,
  } = useProgressState();

  const getUserHoots = async (id?: number) => {
    const myQuery = 
    {
      "select": {
        "?tweet": [
          {
            "*": {
              "_compact": true
            }
          },
          {
            "auther": [
              "*",
              {
                "_compact": true
              }
            ]
          },
          {
            "parentTweet": [
              "*",
              {
                "_compact": true
              }
            ]
          },
          {
            "tweet/_parentTweet": [
              {
                "_as": "retweets"
              }
            ]
          }
        ]
      },
      "where": [["?tweet", "tweet/auther", userData?._id]]
    }
  
    await query({
      myQuery,
      privateKey: authenticatorPrivateKey,
    }).then((res) => setUserHoots(res.data));
  }
  
  const postHoot = async (text: string, image: string) => {
    let fullImagePath = ''
    if (image.length > 0) {
      const id = generateGUID();
      fullImagePath = `user/hootImages/${id}`;
      await RNBlockstackSdk.putFile(
        fullImagePath,
        JSON.stringify(image),
        {
          encrypt: false,
        }
      );
    }
    const hootTxn = [
      {
        _id: "tweet",
        createdAt: "#(now)",
        auther: userData?._id,
        image: fullImagePath,
        text,
        favorites: [],
        replies: [],
      },
    ];
    
    await transact({
      privateKey:
        "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
      myTxn: hootTxn,
      authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
    })
  }

  const getNewsFeed = async () => {
    const myQuery = {
      "select": {
        "?tweets":  [
              {
              "*": {
                "_compact": true
              }
            },
            {
              "auther": [
                "*",
                {
                  "_compact": true
                }
              ]
            },
            {
              "parentTweet": [
                "*",
                {
                  "_compact": true
                },
            {
              "auther": [
                "*",
                {
                  "_compact": true
                }
              ]
            }
              ]
            },
            {
              "tweet/_parentTweet": [
                {
                  "_as": "retweets"
                }
              ]
            }
            ]
      },
      "where": [
        [
          "?var",
          "connections/to",
          "?to"
        ],
        [
          "?var",
          "connections/from",
          userData?._id
        ],
        [
          "?var",
          "connections/status",
          "success"
        ],
        ["?tweets","tweet/auther","?to"]
      ]
    }
    await query({
      myQuery,
      privateKey: authenticatorPrivateKey,
    }).then((res) => setNewsFeedHoots(res.data))
    console.warn(newsFeedHoots)
  }
  return {
    getUserHoots,
    userHoots,
    postHoot,
    getNewsFeed,
    newsFeedHoots,
  };
};


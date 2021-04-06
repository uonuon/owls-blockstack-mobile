import { useCallback, useContext, useEffect, useState } from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IHoot, IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";

const authenticatorPrivateKey =
  "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a";
const authenticatorAuthId = "TfJecBZR7DzqD9hvQLYLrVKuHiUgKDceR8d";

export const useUsers = () => {
  const {userData} = useContext(UserData)
  const [following, setFollowing] = useState();
  const [users, setUsers] = useState([])
  
  const {
    setFailure,
    setLoading,
    setSuccess,
    success,
    failure,
  } = useProgressState();

  const getFollowing = async () => {
    const myQuery = {
        "select": {
          "?following": [
            {
              "to":  [
                "*",
                {
                  "_compact": true
                }
              ]
            }
          ]
        },
        "where": [["?following", "connections/from", userData?._id],
        ["?following","connections/status","success"]]
      }
    await query({
      myQuery,
      privateKey: authenticatorPrivateKey,
    }).then((res) => console.warn('GetFollowing', res.data, userData?._id))
  }

  const getUsers = async (searchText: string) => {
      const myQuery = {"select": {
        "?var": [
          {"*": {"_compact": true}}
        ]
      },
      "where": [
        [
          "?var",
          "_user/fullName",
          "?fullName"
        ],
        [
          "?var",
          "_user/username",
          "?username"
        ],
        {
          "filter": [
            `(or (re-find (re-pattern \"${searchText}\") ?username) (re-find (re-pattern \"${searchText}\") ?fullName))`
          ]
        }
      ]}
      await query({
        myQuery,
        privateKey: authenticatorPrivateKey,
      }).then((res) => setUsers(res.data))
  }

  const followUserById = async (id: number) => {
        const userTxn = [
            {
                "_id": "connections",
                "from": userData?._id,
                "to": id,
                "status": "success"
            }
        ];
        
        await transact({
          privateKey:
            "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
          myTxn: userTxn,
          authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
        })
  }
  return {
    getFollowing,
    getUsers,
    users,
    followUserById,
  };
};


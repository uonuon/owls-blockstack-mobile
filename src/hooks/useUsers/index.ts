import { useCallback, useContext, useEffect, useState } from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IHoot, IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";

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
      privateKey: userData?.appPrivateKey,
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
        privateKey: userData?.appPrivateKey,
      }).then((res) => setUsers(res.data))
  }

  return {
    getFollowing,
    getUsers,
    users,
  };
};


import {
  queryFollowers,
  queryFollowings,
  queryUserHoots,
} from "./../../../shared/Queries/index";
import { useContext, useEffect, useState } from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IHoot, IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";
import { multiQuery } from "src/utils/Axios/multiQuery";

const authenticatorPrivateKey =
  "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a";

export const useProfile = (currentProfile: IUser) => {
  const [currentFollowers, setCurrentFollowers] = useState<IUser[]>([]);
  const [currentFollowing, setCurrentFollowing] = useState<IUser[]>([]);
  const { userData } = useContext(UserData);
  const {
    setFailure,
    setLoading,
    setSuccess,
    success,
    failure,
  } = useProgressState();

  useEffect(() => {
    if (currentProfile) {
      setLoading();
      multiQuery({
        myQueries: {
          followers: queryFollowers(currentProfile?._id),
          following: queryFollowings(currentProfile?._id),
        },
        privateKey: authenticatorPrivateKey,
      })
        .then(({ data: { followers, following } }) => {
          setCurrentFollowers(followers);
          setCurrentFollowing(following);
          setSuccess();
        })
        .catch(setFailure);
    }
  }, [currentProfile]);

  const followUserById = async (id: number) => {
    if (id) {
      const userTxn = [
        {
          _id: "connections",
          from: userData._id,
          to: id,
          status: "success",
        },
      ];
  
      return await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: userTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      })
    }
  };

  return {
    currentFollowers,
    currentFollowing,
    success,
    failure,
    followUserById,
  };
};

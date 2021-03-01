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
  const [profileHoots, setProfileHoots] = useState<IHoot[]>([]);
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
          hoots: queryUserHoots(currentProfile?._id)
        },
        privateKey: authenticatorPrivateKey,
      }).then(({data: {followers,following,hoots}}) => {
          setCurrentFollowers(followers);
          setCurrentFollowing(following);
          setProfileHoots(hoots);
          setSuccess();
      }).catch(setFailure);
    }
  }, [currentProfile]);

  return {
    currentFollowers,
    currentFollowing,
    profileHoots,
    success,
    failure,
  };
};

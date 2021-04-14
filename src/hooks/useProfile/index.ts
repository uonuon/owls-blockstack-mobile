import {
  queryConnection,
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
import {useRealTime} from "../useRealTime";

const REJECTED = "rejected";
const SUCCESS = "success";
const BLOCKED = "blocked";
const PENDING = "pending";
export const ConnectionsStatusesMapper = {
  [REJECTED] : "Follow",
  [SUCCESS] : "Following",
  [PENDING] : "Pending"
}

export const ConnectionsStatuses = {
  [REJECTED]: REJECTED,
  [SUCCESS]: SUCCESS,
  [PENDING]: PENDING,
  [BLOCKED]: BLOCKED,
}

export const useProfile = (currentProfile: IUser) => {
  const [currentFollowers, setCurrentFollowers] = useState<IUser[]>([]);
  const [currentFollowing, setCurrentFollowing] = useState<IUser[]>([]);
  const [connection, setConnection] = useState();
  const { userData } = useContext(UserData);
  const {callBackFollowingUser} = useRealTime();
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
          connection: queryConnection(userData?._id, currentProfile?._id)
        },
        privateKey: userData?.appPrivateKey,
      })
        .then(({ data: { followers, following, connection } }) => {
          setConnection({...connection.from,connectionId: connection._id,status: connection.status})
          setCurrentFollowers(followers.map((fol: any) => ({...fol.from,connectionId: fol._id,status: fol.status})));
          setCurrentFollowing(following);
          setSuccess();
        })
        .catch(setFailure);
    }
  }, [currentProfile]);

  const followUserById = async (id: number, status: string,prevConId?: number) => {
    if (id && status) {
      const userTxn = [
        {
          _id: prevConId || "connections",
          from: userData?._id,
          to: id,
          status,
        },
      ];
      callBackFollowingUser(id.toString(), status !== SUCCESS);
      return await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: userTxn,
        authId: userData?.authId,
      }).then(() => {
          query({
            myQuery: queryConnection(userData?._id, currentProfile?._id),
            privateKey: userData?.appPrivateKey,
          }).then(res => {
            const connectionRes = {...res.data.from,connectionId: res.data._id,status: res.data.status};
            const prevConnectionFollower = currentFollowers.filter(cf => cf.connectionId === connectionRes.connectionId)[0];
            if(prevConnectionFollower && connectionRes.status !== ConnectionsStatuses[SUCCESS]){
              setCurrentFollowers(currentFollowers.filter(cf => cf.connectionId !== connectionRes.connectionId));
            }
            if(!prevConnectionFollower && connectionRes.status === ConnectionsStatuses[SUCCESS]){
              setCurrentFollowers([...currentFollowers,connectionRes]);
            }
            setConnection(connectionRes);
          })
      })
    }
  };

  return {
    currentFollowers,
    currentFollowing,
    success,
    failure,
    followUserById,
    connection
  };
};

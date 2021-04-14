import { useRealTime } from "src/hooks/useRealTime";
import { arrayToObj } from "./../../utils/crypto/index";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IHoot, IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";
import {
  hootsQueriesMap,
  HootsQueriesTypes,
  newsFeed,
  queryFollowings,
} from "shared/Queries";
interface HootsService {
  queryType?: HootsQueriesTypes;
  id?: number;
  disableFetch?: boolean;
}

export interface PostHoot {
  text?: string;
  image?: string;
  hootId?: number;
}
export const useHoots = ({ id, queryType, disableFetch }: HootsService) => {
  const [dataObj, setDataObj] = useState<{ [x: string]: IHoot }>({});
  const dataObjRef = useRef(dataObj);
  dataObjRef.current = dataObj;
  const { userData } = useContext(UserData);
  const {
    setFailure,
    setLoading,
    setSuccess,
    loading,
    success,
  } = useProgressState();
  const { hootsMapper, registerHootsIds,newHootsFlag,toggleNewHootsFlag } = useRealTime();
  const [page, setPage] = useState<number>(0);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  const data = useMemo(() => {
    return Object.values(dataObj).sort((a, b) => b.createdAt - a.createdAt);
  }, [dataObj, dataObjRef.current]);

  useEffect(() => {
    if (!disableFetch) {
      Object.keys(hootsMapper).forEach((tweetsKey) => {
        if (dataObj[tweetsKey.toString()]) {
          const newObj = {...dataObj};
          delete newObj[tweetsKey.toString()];
          const hootsUpdates = {
            ...newObj,
            [hootsMapper[tweetsKey.toString()].transactionID]: {
              ...dataObj[tweetsKey.toString()],
              favorites: [...(dataObj[tweetsKey.toString()]?.favorites || []),
                ...(hootsMapper[tweetsKey.toString()].transactionFlake?.favorites || []).map(userId => ({_id: userId}))],
              replies: [...(dataObj[tweetsKey.toString()]?.replies || []),
                ...(hootsMapper[tweetsKey.toString()].transactionFlake?.replies || [])],
              _id: hootsMapper[tweetsKey.toString()].transactionID,
            },
          };
          const parentId = hootsMapper[tweetsKey.toString()].transactionFlake?.parentTweet;
          if(!!parentId && dataObj[parentId]){
            hootsUpdates[parentId] = {...dataObj[parentId],retweets: [...dataObj[parentId].retweets, hootsMapper[tweetsKey.toString()].transactionID]}
          }
          setDataObj(hootsUpdates);
        }
      });
    }
  }, [hootsMapper, disableFetch]);

  useEffect(() => {
    setDataObj({});
  }, [id]);
  
  useEffect(() => {
    if (!disableFetch) {
      refresh();
    }
  }, [disableFetch, queryType, id, page]);

  const loadMoreHoots = useCallback(() => {
    if (!loading && !hasReachedEnd) {
      setPage((prevState) => prevState + 1);
    }
  }, []);

  const postData = useCallback(
    async ({ hootId, image, text }: PostHoot) => {
      const fullImagePath = await uploadImage(image);
      const tempId = generateGUID();
      if (hootId) {
        setDataObj({
          ...dataObjRef.current,
          [hootId]: {
            ...dataObjRef.current[hootId],
            retweets: [
              ...(dataObjRef.current[hootId].retweets || []),
              { auther: userData },
            ],
          },
        });
      }
      const hootTxn = [
        {
          _id: `tweet$${tempId}`,
          createdAt: "#(now)",
          auther: userData?._id,
          parentTweet: hootId,
          image: fullImagePath,
          text,
        },
      ];
      setDataObj({
        [tempId]: {
          ...hootTxn[0],
          _id: tempId,
          createdAt: new Date().getTime(),
          auther: userData,
          parentTweet: hootId ? dataObjRef.current[hootId] : undefined,
          favorites: [],
          retweets: [],
        },
        ...dataObjRef.current,
      });
      await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: hootTxn,
        authId: userData?.authId,
      })
    },
    [dataObj]
  );

  const replyToHoot = useCallback(
    async (text: string, image: string, hootId?: string) => {
      const fullImagePath = await uploadImage(image);
      const tempId = generateGUID();
      const hootTxn = [
        {
          _id: `tweet$reply-${hootId}${tempId}`,
          createdAt: "#(now)",
          auther: userData?._id,
          image: fullImagePath,
          text,
        },
        {
          _id: hootId,
          replies: [`tweet$reply-${hootId}${tempId}`],
        },
      ];
      setDataObj({
        ...dataObjRef.current,
        [`reply-${hootId}${tempId}`]: {
          ...hootTxn[0],
          _id: hootTxn[0]._id?.replace("tweet$", ""),
          text,
          createdAt: new Date().getTime(),
          auther: userData,
          parentTweet: hootId ? dataObjRef.current[hootId] : undefined,
        },
      });
      await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: hootTxn,
        authId: userData?.authId,
      });
    },
    []
  );
  const uploadImage = useCallback(async (image: string) => {
    if (image && image.length > 0) {
      const id = generateGUID();
      const fullImagePath = `user/hootImages/${id}`;
      await RNBlockstackSdk.putFile(fullImagePath, JSON.stringify(image), {
        encrypt: false,
      });
      return fullImagePath;
    }
    return undefined;
  }, []);

  const loveHoot = useCallback(
    async (hootId: string) => {
      const hootTxn = [
        {
          _id: hootId,
          favorites: [userData?._id],
        },
      ];
      // console.warn(dataObj, hootId)
      // setDataObj({
      //   ...dataObjRef.current,
      //   [hootId]: {
      //     ...dataObjRef.current[hootId],
      //     favorites: [
      //       ...(dataObjRef.current[hootId].favorites || []),
      //       { _id: userData?._id },
      //     ],
      //   },
      // });
      await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: hootTxn,
        authId: userData?.authId,
      });
    },
    [userData, dataObjRef.current]
  );

  const refresh = async () => {
    setLoading();
    toggleNewHootsFlag(false);
    query({
      myQuery: hootsQueriesMap[queryType](id, data.length),
      privateKey: userData?.appPrivateKey,
    })
      .then((res) => {
        setDataObj({ ...dataObjRef.current, ...arrayToObj(res.data) });
        setHasReachedEnd(res.data.length < 20);
        setSuccess();
      })
      .catch(setFailure);
  };
  useEffect(() => {
    registerHootsIds(Object.keys(dataObj));
  },[dataObj]);
  return {
    loading,
    data,
    dataObj,
    postData,
    replyToHoot,
    loveHoot,
    loadMoreHoots,
    hasReachedEnd,
    success,
    newHootsFlag,
    refresh,
  };
};

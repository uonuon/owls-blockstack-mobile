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
import { hootsQueriesMap, HootsQueriesTypes, newsFeed } from "shared/Queries";

const authenticatorPrivateKey =
  "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a";
const authenticatorAuthId = "TfJecBZR7DzqD9hvQLYLrVKuHiUgKDceR8d";

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
  const { setFailure, setLoading, setSuccess, loading } = useProgressState();
  const { tweetsMapper } = useRealTime();
  const [page, setPage] = useState<number>(0);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  const data = useMemo(
    () => Object.values(dataObj).sort((a, b) => b.createdAt - a.createdAt),
    [dataObj]
  );

  useEffect(() => {
    if (!disableFetch) {
      Object.keys(tweetsMapper).forEach((tweetsKey) => {
        if (dataObj[tweetsKey.toString()]) {
          setDataObj({
            ...dataObj,
            [tweetsKey.toString()]: {
              ...dataObj[tweetsKey.toString()],
              _id: tweetsMapper[tweetsKey.toString()],
            },
          });
        }
      });
    }
  }, [tweetsMapper, disableFetch]);

  useEffect(() => {
    if (!disableFetch) {
      setLoading();
      console.warn("GEET HNA");
      query({
        myQuery: hootsQueriesMap[queryType](id, data.length),
        privateKey: authenticatorPrivateKey,
      })
        .then((res) => {
          setDataObj({ ...dataObjRef.current, ...arrayToObj(res.data) });
          setHasReachedEnd(res.data.length < 10);
          setSuccess();
        })
        .catch(setFailure);
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
      await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: hootTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      }).then(() => {
        setDataObj({
          [tempId]: {
            ...hootTxn,
            text,
            createdAt: new Date().getTime(),
            auther: userData,
            parentTweet: hootId ? dataObjRef.current[hootId] : undefined,
          },
          ...dataObjRef.current,
        });
      });
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
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: hootTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
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

  const loveHoot = useCallback(async (hootId: string) => {
    const hootTxn = [
      {
        _id: hootId,
        favorites: [userData?._id],
      },
    ];
    setDataObj({
      ...dataObjRef.current,
      [hootId]: {
        ...dataObjRef.current[hootId],
        favorites: [
          ...(dataObjRef.current[hootId].favorites || []),
          userData?._id,
        ],
      },
    });
    await transact({
      privateKey:
        "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
      myTxn: hootTxn,
      authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
    });
  }, []);

  return {
    loading,
    data,
    dataObj,
    postData,
    replyToHoot,
    loveHoot,
    loadMoreHoots,
    hasReachedEnd,
  };
};

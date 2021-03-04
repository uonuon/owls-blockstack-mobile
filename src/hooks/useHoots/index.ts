import { useCallback, useContext, useEffect, useState } from "react";
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
  text?: string
  image?: string
  hootId?: number
}

export const useHoots = ({ id, queryType, disableFetch }: HootsService) => {
  const [data, setData] = useState<IHoot[]>([]);
  const { userData } = useContext(UserData);
  const { setFailure, setLoading, setSuccess, loading } = useProgressState();

  useEffect(() => {
    if (!disableFetch) {
      setLoading();
      query({
        myQuery: hootsQueriesMap[queryType](id),
        privateKey: authenticatorPrivateKey,
      })
        .then((res) => setData(res.data))
        .then(setSuccess)
        .catch(setFailure);
    }
  }, []);

  const postData = useCallback(
    async ({hootId, image, text}: PostHoot) => {
      const fullImagePath = await uploadImage(image);
      const hootTxn = [
        {
          _id: "tweet",
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
      });
    },
    []
  );

  const replyToHoot = useCallback(
    async (text: string, image: string, hootId?: number) => {
      const fullImagePath = await uploadImage(image);
      const hootTxn = [
        {
          _id: "tweet$tempReply",
          createdAt: "#(now)",
          auther: userData?._id,
          image: fullImagePath,
          text,
        },
        {
          _id: hootId,
          replies: ["tweet$tempReply"],
        },
      ];
      await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: hootTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      })
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
    async (hootId?: number) => {
      const hootTxn = [
        {
          _id: hootId,
          favorites: [userData?._id],
        },
      ];
      await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: hootTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      })
    },
    []
  );

  return {
    loading,
    data,
    postData,
    replyToHoot,
    loveHoot,
  };
};

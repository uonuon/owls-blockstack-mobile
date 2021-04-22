import { useRealTime } from "src/hooks/useRealTime";
import { arrayToObj } from "./../../utils/crypto/index";
import {
  DependencyList,
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
import { database } from "src/db";
import { Hoot } from "src/db/models/HootsModel";
import { Q, Relation } from "@nozbe/watermelondb";
import { relation } from "@nozbe/watermelondb/decorators";
interface HootsService {
  queryType?: HootsQueriesTypes;
  id?: number;
  disableFetch?: boolean;
}

export const usePromisedMemo = <T = any>(
  factory: () => Promise<T>,
  defaultValue: T,
  deps: DependencyList
) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    factory().then((data) => setValue(data));
  }, deps);
  return value;
};

export interface PostHoot {
  text?: string;
  image?: string;
  hoot?: Hoot;
}
export const useHoots = ({ id, queryType, disableFetch }: HootsService) => {
  // const [dataObj, setDataObj] = useState<{ [x: string]: IHoot }>({});
  // const dataObjRef = useRef(dataObj);
  // dataObjRef.current = dataObj;
  const { userData } = useContext(UserData);
  const {
    setFailure,
    setLoading,
    setSuccess,
    loading,
    success,
  } = useProgressState();
  const [page, setPage] = useState<number>(0);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  // const [data, setData] = useState<IHoot[]>([]);

  const data = database.collections
  .get<Hoot>("hoots")
  .query(
    Q.experimentalSortBy("created_at", "desc"),
    Q.experimentalTake(50),
    Q.experimentalSkip(0)
  )
  // useEffect(() => {
  //   if (!disableFetch) {
  //     refresh();
  //   }
  // }, [disableFetch, queryType, id, page]);

  const loadMoreHoots = useCallback(async () => {
    const count = await data.fetchCount();
    const isAtEnd = await database.collections
    .get<Hoot>("hoots").query().fetchCount() === count;
    setHasReachedEnd(isAtEnd)
    if (!loading && !isAtEnd) {
      setPage((prevState) => prevState + 1);
      // data.extend(Q.experimentalSkip(count));
    }
  }, []);

  const postData = useCallback(async ({ hoot, image, text }: PostHoot) => {
    const fullImagePath = await uploadImage(image);
    const tempId = generateGUID();
    const hootTxn = [
      {
        _id: `tweet$${tempId}`,
        createdAt: "#(now)",
        auther: userData?._id,
        image: fullImagePath,
        text,
      },
    ];
    await database.action(async () => {
      await database.collections.get<Hoot>('hoots').create((h) => {
        h._raw.id = tempId.toString()
        h.text = text
        h.image = image;
        h.favoritesNumber = 0;
        h.retweetsNumber = 0
        h.repliesNumber = 0
        h.isRetweeted = false
        h.isFavorite = false
        h.user.id = userData?._id.toString()
      });

    await transact({
      privateKey: userData?.appPrivateKey,
      myTxn: hootTxn,
      authId: userData?.authId,
    })
    })
  
  }, []);

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
      // setDataObj({
      //   ...dataObjRef.current,
      //   [`reply-${hootId}${tempId}`]: {
      //     ...hootTxn[0],
      //     _id: hootTxn[0]._id?.replace("tweet$", ""),
      //     text,
      //     createdAt: new Date().getTime(),
      //     auther: userData,
      //     parentTweet: hootId ? dataObjRef.current[hootId] : undefined,
      //   },
      // });
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
    async (hoot) => {
      setData(
        data.map((item) => {
          if (+item.id === +hoot.id && !item.isFavorite) {
            return {
              ...item,
              isFavorite: true,
              favoritesNumber: item.favoritesNumber + 1,
            };
          } else {
            return item;
          }
        })
      );
      await database.collections
        .get<Hoot>("hoots")
        .find(hoot.id)
        .then(async (hoot) => {
          await database.action(async () => {
            await hoot.update((hoot) => {
              (hoot.isFavorite = true),
                (hoot.favoritesNumber = hoot.favoritesNumber + 1);
            });
          });
        });
      const hootTxn = [
        {
          _id: +hoot.id,
          favorites: [userData?._id],
        },
      ];
      await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: hootTxn,
        authId: userData?.authId,
      });
    },
    [data]
  );

  const refresh = async () => {
    setLoading();
    const hoots = await database.collections
      .get<Hoot>("hoots")
      .query(
        Q.experimentalSortBy("created_at", "asc"),
        Q.experimentalTake(20),
        Q.experimentalSkip(data.length)
      )
      .fetch()
      setData(hoots);
      setSuccess();
      console.log('dasd')
      // .then(async (res) => {
      //   const hoots = (
      //     await Promise.all(
      //       res.map(async (hoot) => {
      //         const user = await hoot.user.fetch();
      //         let threadParent = await hoot.threadParent.fetch();
      //         if (threadParent) {
      //           const currentUser = await threadParent?.user.fetch();
      //           threadParent = {
      //             id: threadParent.id,
      //             createdAt: threadParent.createdAt,
      //             text: threadParent.text,
      //             image: threadParent.image,
      //             favoritesNumber: threadParent.favoritesNumber,
      //             retweetsNumber: threadParent.retweetsNumber,
      //             repliesNumber: threadParent.repliesNumber,
      //             isRetweeted: threadParent.isRetweeted,
      //             isFavorite: threadParent.isFavorite,
      //             user: currentUser,
      //           };
      //         }
      //         let parentTweet = await hoot.parentTweet.fetch();
      //         if (parentTweet) {
      //           const currentUser = await parentTweet?.user.fetch();
      //           parentTweet = {
      //             id: parentTweet.id,
      //             createdAt: parentTweet.createdAt,
      //             text: parentTweet.text,
      //             image: parentTweet.image,
      //             favoritesNumber: parentTweet.favoritesNumber,
      //             retweetsNumber: parentTweet.retweetsNumber,
      //             repliesNumber: parentTweet.repliesNumber,
      //             isRetweeted: parentTweet.isRetweeted,
      //             isFavorite: parentTweet.isFavorite,
      //             user: currentUser,
      //           };
      //         }
      //         return {
      //           ...hoot,
      //           id: hoot.id,
      //           createdAt: hoot.createdAt,
      //           text: hoot.text,
      //           image: hoot.image,
      //           threadParent,
      //           parentTweet,
      //           favoritesNumber: hoot.favoritesNumber,
      //           retweetsNumber: hoot.retweetsNumber,
      //           repliesNumber: hoot.repliesNumber,
      //           isRetweeted: hoot.isRetweeted,
      //           isFavorite: hoot.isFavorite,
      //           user,
      //         };
      //       })
      //     )
      //   ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      //   setData(hoots);
      //   setSuccess();
      // });
  };
  // useEffect(() => {
  //   registerHootsIds(Object.keys(dataObj));
  // },[dataObj]);

  return {
    loading,
    data,
    // dataObj,
    postData,
    replyToHoot,
    loveHoot,
    loadMoreHoots,
    hasReachedEnd,
    success,
    refresh,
  };
};

import { Assets } from "assets";
import {
  defaultConfig,
  useGetUserImage,
  useNavigationUtils,
} from "hooks";
import React, { useContext, useMemo, useState } from "react";
import { View, Image, Text, ViewStyle } from "react-native";
import { HootProps } from "./types";
import styles from "./styles";
import { HootAction } from "components";
import { HootHeader } from "./HootHeader";
import { HootContent } from "./HootContent";
import { UserData } from "contexts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IUser } from "shared";

const {
  components: {
    hoot: { more, love, reply, retweet, retweetActive, share, image, defaultAvatar, loveActive },
  },
} = Assets.images;

export const useGetHootImage = (hoot: IHoot, overrideStyles?: ViewStyle) => {
  const [data, setData] = useState<string>();
  useMemo(async () => {
    const gaiaURL =
      hoot.user?.profile &&
      JSON.parse(hoot.user.profile).apps[defaultConfig.appDomain];
    const image = hoot.image
      ? await fetch(gaiaURL + hoot.image, {
          method: "GET",
        }).then((res) => res.json())
      : undefined;
    return image;
  }, [hoot]).then((res) => setData(res));

  return data ? (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        overflow: "hidden",
        ...overrideStyles,
      }}
    >
      <Image
        source={{
          uri: data,
        }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </TouchableOpacity>
  ) : null;
};

export const Hoot: React.FC<HootProps> = ({threadParent,threadParentUser, parentTweet, parentUser, currentHoot, isThreadHoot, nextHoot, prevHoot, isParent, user }) => {
  const { navigateTo } = useNavigationUtils();
  const userImage = useGetUserImage(parentUser || user, styles.image);
  const hootImage = useGetHootImage(parentTweet || currentHoot, styles.hootImage);
  const {userData} = useContext(UserData);
  const goToReplies = () => {
    navigateTo({ name: "Replies", params: {hoot: currentHoot} })
  }
  let loveIcon = currentHoot.isFavorite ? loveActive : love;
  let retweetIcon = currentHoot.isRetweeted ? retweetActive : retweet;
  const isThread = (!prevHoot && (threadParent));
  return (
    <>
    {isThread && !isParent && <Text style={styles.text}>{user.fullName} Replied.</Text>}
    {isThread && <Hoot user={threadParentUser} nextHoot={nextHoot} currentHoot={threadParent || currentHoot} isThreadHoot={true} />} 
    <View style={[styles.container, {borderBottomWidth: nextHoot || isThreadHoot ? 0 : 1}]}>
      <View style={{alignItems: 'center',}}>
      {(nextHoot || isThread) && <View style={{height: '100%', width: 2, backgroundColor: 'gray', borderRadius: 2, position: 'absolute', top: 48, right: 38}}></View>}
      {userImage}
      </View>
      <View style={styles.hootContent}>
        <HootHeader
          date={currentHoot.createdAt}
          username={user.username}
          name={user.fullName}
        />
        <HootContent text={(parentTweet?.text || currentHoot.text)} />
        {hootImage}
        <View style={styles.hootFooter}>
          <HootAction
            icon={reply}
            counter={currentHoot.repliesNumber}
            action={goToReplies}
          />
          <HootAction
            icon={retweetIcon}
            counter={currentHoot.retweetsNumber}
            action={() => currentHoot.retweetHoot(userData as IUser)}
          />
          <HootAction
            icon={loveIcon}
            counter={currentHoot.favoritesNumber}
            action={() => {
              currentHoot.favoriteHoot(userData as IUser);
            }}
          />
          {/* <HootAction
            icon={share}
            counter={0}
            action={() => console.log("pressed")}
          /> */}
        </View>
      </View>
    </View>
    </>
  );
};

import { Assets } from "assets";
import {
  defaultConfig,
  useGetUserImage,
  useNavigationUtils,
} from "hooks";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Image, Text, Pressable, ViewStyle } from "react-native";
import { HootProps } from "./types";
import styles from "./styles";
import { HootAction } from "components";
import { HootHeader } from "./HootHeader";
import { date, number } from "yup/lib/locale";
import { HootContent } from "./HootContent";
import { UserData } from "contexts";
import { TouchableOpacity } from "react-native-gesture-handler";

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

export const Hoot: React.FC<HootProps> = ({ currentHoot, loveHoot, retweetHoot, isThreadHoot, nextHoot, prevHoot, isParent }) => {
  const { navigateTo } = useNavigationUtils();
  const userImage = useGetUserImage(currentHoot.user, styles.image);
  const hootImage = useGetHootImage(currentHoot, styles.hootImage);
  const goToReplies = () => {
    navigateTo({ name: "Replies", params: {hoot: currentHoot, loveHoot, retweetHoot} })
  }
  let loveIcon = currentHoot.isFavorite ? loveActive : love;
  let retweetIcon = currentHoot.isRetweeted ? retweetActive : retweet;
  const isThread = (!prevHoot && (currentHoot.threadParent));
  return (
    <>
    {isThread && !isParent && <Text style={styles.text}>{currentHoot.user.fullName} Replied.</Text>}
    {isThread && <Hoot nextHoot={nextHoot} currentHoot={currentHoot.threadParent} isThreadHoot={true} loveHoot={loveHoot} retweetHoot={retweetHoot} />}
    <View style={[styles.container, {borderBottomWidth: nextHoot || isThreadHoot ? 0 : 1}]}>
      <View style={{alignItems: 'center',}}>
      {(nextHoot || isThreadHoot) && <View style={{height: '100%', width: 2, backgroundColor: 'gray', borderRadius: 2, position: 'absolute', top: 48, right: 38}}></View>}
      {userImage}
      </View>
      <View style={styles.hootContent}>
        <HootHeader
          date={currentHoot.createdAt}
          username={currentHoot.user.username}
          name={currentHoot.user.fullName}
        />
        <HootContent text={currentHoot.text} />
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
            action={() => {retweetHoot({hoot: currentHoot})}}
          />
          <HootAction
            icon={loveIcon}
            counter={currentHoot.favoritesNumber}
            action={() => {
              loveHoot(currentHoot)
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

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
import { hi } from "date-fns/locale";
import { IHoot } from "shared";
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
      hoot.auther?.profile &&
      JSON.parse(hoot.auther.profile).apps[defaultConfig.appDomain];
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
  const userImage = useGetUserImage(currentHoot.auther, styles.image);
  const hootImage = useGetHootImage(currentHoot, styles.hootImage);
  const goToReplies = () => {
    navigateTo({ name: "Replies", params: {hoot: currentHoot, loveHoot, retweetHoot} })
  }
  const { userData } = useContext(UserData); 
  let loveIcon = currentHoot.favorites?.filter((user: any) => user._id === userData?._id).length > 0 ? loveActive : love;
  let retweetIcon = currentHoot.retweets?.filter((user: any) => user.auther._id === userData?._id).length > 0 ? retweetActive : retweet;
  const isThread = (!prevHoot && (currentHoot.threadParent && currentHoot.threadParent[0]));
  return (
    <>
    {isThread && !isParent && <Text style={styles.text}>{currentHoot.auther.fullName} Replied.</Text>}
    {isThread && <Hoot nextHoot={nextHoot} currentHoot={currentHoot.threadParent[0]} isThreadHoot={true} loveHoot={loveHoot} retweetHoot={retweetHoot} />}
    <View style={[styles.container, {borderBottomWidth: nextHoot || isThreadHoot ? 0 : 1}]}>
      <View style={{alignItems: 'center',}}>
      {(nextHoot || isThreadHoot) && <View style={{height: '100%', width: 2, backgroundColor: 'gray', borderRadius: 2, position: 'absolute', top: 48, right: 38}}></View>}
      {userImage}
      </View>
      <View style={styles.hootContent}>
        <HootHeader
          date={currentHoot.createdAt}
          username={currentHoot.auther.username}
          name={currentHoot.auther.fullName}
        />
        <HootContent text={currentHoot.text} />
        {hootImage}
        <View style={styles.hootFooter}>
          <HootAction
            icon={reply}
            counter={currentHoot.replies?.length || 0}
            action={goToReplies}
          />
          <HootAction
            icon={retweetIcon}
            counter={currentHoot.retweets?.length || 0}
            action={() => retweetHoot({hootId: currentHoot._id})}
          />
          <HootAction
            icon={loveIcon}
            counter={currentHoot.favorites?.length || 0}
            action={() => {
              loveHoot(currentHoot._id)
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

import { Assets } from "assets";
import {
  defaultConfig,
  useGetUserImage,
  useNavigationUtils,
  useTheme,
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
    hoot: { more, love, reply, retweet, share, image, defaultAvatar },
  },
} = Assets.images;

export const useGetHootImage = (hoot: IHoot, overrideStyles?: ViewStyle) => {
  const [data, setData] = useState<string>();

  useMemo(async () => {
    const gaiaURL =
      hoot.auther.profile &&
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

export const Hoot: React.FC<HootProps> = ({ currentHoot }) => {
  const { navigateTo } = useNavigationUtils();
  const userImage = useGetUserImage(currentHoot.auther, styles.image);
  const hootImage = useGetHootImage(currentHoot, styles.hootImage);

  return (
    <View style={styles.container}>
      {userImage}
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
            action={() => navigateTo({ name: "Replies" })}
          />
          <HootAction
            icon={retweet}
            counter={currentHoot.retweets?.length || 0}
            action={() => console.log("pressed")}
          />
          <HootAction
            icon={love}
            counter={currentHoot.favorites?.length || 0}
            action={() => console.log("pressed")}
          />
          <HootAction
            icon={share}
            counter={0}
            action={() => console.log("pressed")}
          />
        </View>
      </View>
    </View>
  );
};

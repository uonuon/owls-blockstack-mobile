import { Assets } from "assets";
import { useNavigationUtils, useTheme } from "hooks";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { HootProps } from "./types";
import styles from "./styles";
import { HootAction } from "components";
import { HootHeader } from "./HootHeader";
import { date, number } from "yup/lib/locale";
import { HootContent } from "./HootContent";
const {
  components: {
    hoot: { more, avatar, love, reply, retweet, share, image },
  },
} = Assets.images;

export const Hoot: React.FC<HootProps> = ({
  date,
  likes,
  name,
  replies,
  retweets,
  username,
  image,
  content,
}) => {
  const { navigateTo } = useNavigationUtils();
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.image} />
      <View style={styles.hootContent}>
        <HootHeader date={date} username={username} name={name} />
        <HootContent text={content} hootImage={image} />
        <View style={styles.hootFooter}>
          <HootAction
            icon={reply}
            counter={replies}
            action={() => navigateTo({ name: "Replies" })}
          />
          <HootAction
            icon={retweet}
            counter={retweets}
            action={() => console.log("pressed")}
          />
          <HootAction
            icon={love}
            counter={likes}
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

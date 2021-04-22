import { Assets } from "assets";
import {
  defaultConfig,
  useGetUserImage,
  useNavigationUtils,
  useTheme,
} from "hooks";
import React, { useMemo, useState } from "react";
import { View, Image, Text, Pressable, ViewStyle } from "react-native";
import { ReplyProps } from "./types";
import styles from "./styles";
import { HootAction, useGetHootImage } from "components";
import { HootHeader } from "../Hoot/HootHeader";
import { IHoot } from "shared";
const {
  components: {
    hoot: { more, defaultAvatar, love, reply, retweet, share, image },
  },
} = Assets.images;

export const Reply: React.FC<ReplyProps> = ({ currentHoot, loveHoot, retweetHoot }) => {
  const { navigateTo } = useNavigationUtils();
  const userImage = useGetUserImage(currentHoot.user, styles.image);
  const replyImage = useGetHootImage(currentHoot, styles.replyImage);

  const goToReplies = () => {
    navigateTo({ name: "Replies", params: {hoot: currentHoot} })
  }

  return (
    <View style={styles.container}>
      {userImage}
      <View style={styles.replyContent}>
        <View style={styles.replyContainer}>
          <View style={styles.replyHeader}>
            <View style={styles.replyHeader}>
              <HootHeader
                date={currentHoot.createdAt}
                name={currentHoot.user.fullName}
                username={currentHoot.user.username}
              />
            </View>
          </View>
          <View style={styles.replyTextContainer}>
            <Text style={styles.replyText}>{currentHoot.text}</Text>
          </View>
        </View>
        {replyImage}
        <View style={styles.replyFooter}>
          <HootAction
            icon={reply}
            counter={currentHoot.replies?.length || 0}
            action={goToReplies}
          />
          <HootAction
            icon={retweet}
            counter={currentHoot.retweets?.length || 0}
            action={() => retweetHoot({hootId: currentHoot._id})}
          />
          <HootAction
            icon={love}
            counter={currentHoot.favorites?.length || 0}
            action={() => loveHoot(currentHoot._id)}
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

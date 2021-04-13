import { Assets } from "assets";
import { useTheme } from "hooks";
import React from "react";
import { View, Text } from "react-native";
import { Hoot } from "components";
import { HootProps } from "../Hoot/types";
import styles from "./styles";

export const RetweetedHoot: React.FC<HootProps> = ({
  currentHoot,
  loveHoot,
  nextHoot,
  isThreadHoot,
  retweetHoot,
  prevHoot,
}) => {
  const {
    theme: { colors, fonts },
  } = useTheme();
  return (
    <View style={{ paddingTop: currentHoot.parentTweet ? 10 : 0 }}>
      {currentHoot.parentTweet && (
        <Text
          style={styles.text}
        >
          {currentHoot.auther.fullName + " Rehooted"}
        </Text>
      )}
      <Hoot
        currentHoot={currentHoot.parentTweet ? currentHoot.parentTweet : currentHoot}
        loveHoot={loveHoot}
        isParent={currentHoot.parentTweet ? true : false}
        prevHoot={prevHoot}
        nextHoot={nextHoot}
        retweetHoot={retweetHoot}
      />
    </View>
  );
};

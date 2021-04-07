import { Assets } from "assets";
import { useTheme } from "hooks";
import React from "react";
import { View, Text } from "react-native";
import { Hoot } from "components";
import { HootProps } from "../Hoot/types";

export const RetweetedHoot: React.FC<HootProps> = ({
  currentHoot,
  loveHoot,
  retweetHoot,
}) => {
  const {
    theme: { colors, fonts },
  } = useTheme();
  return (
    <View style={{ paddingTop: currentHoot.parentTweet ? 10 : 0 }}>
      {currentHoot.parentTweet && (
        <Text
          style={{
            color: colors.secondaryHighContrasted,
            fontSize: 12,
            fontWeight: "bold",
            marginLeft: 80,
            position: "absolute",
            top: 10,
          }}
        >
          {currentHoot.auther.fullName + " Retweeted"}
        </Text>
      )}
      <Hoot
        currentHoot={currentHoot}
        loveHoot={loveHoot}
        retweetHoot={retweetHoot}
      />
    </View>
  );
};

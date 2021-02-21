import { Assets } from "assets";
import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { HootContentProps } from "./types";
import { formatDistanceToNow } from "date-fns";

export const HootContent: React.FC<HootContentProps> = ({ text, hootImage }) => {
  return (
    <View>
      <View style={styles.hootTextContainer}>
        <Text style={styles.hootText}>
          {text}
        </Text>
      </View>
      {hootImage && <Image source={{ uri: hootImage }} style={styles.hootImage} />}
    </View>
  );
};

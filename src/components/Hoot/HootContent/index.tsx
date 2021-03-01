import { Assets } from "assets";
import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { HootContentProps } from "./types";
import { formatDistanceToNow } from "date-fns";
import { defaultConfig } from "hooks";

export const HootContent: React.FC<HootContentProps> = ({ text }) => {
  return (
      <View style={styles.hootTextContainer}>
        <Text style={styles.hootText}>
          {text}
        </Text>
      </View>
  );
};

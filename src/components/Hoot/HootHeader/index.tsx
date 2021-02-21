import { Assets } from "assets";
import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { HootHeaderProps } from "./types";
import { formatDistanceToNow } from "date-fns";
const {
  components: {
    hoot: { more },
  },
} = Assets.images;

export const HootHeader: React.FC<HootHeaderProps> = ({ date, name, username }) => {

  return (
    <View style={styles.hootHeader}>
      <View style={styles.hootHeader}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>
          @{username} •{" "}
          <Text style={styles.date}>{formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}</Text>
        </Text>
      </View>
      <Image resizeMode="cover" source={more} style={styles.more} />
    </View>
  );
};

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
  const rightDate = formatDistanceToNow(date, { addSuffix: true }).toLowerCase().replace(' minutes', 'm').replace('ago', '').replace('seconds', 's').replace('less than a minute', '1m').replace('1 minute', '1m')
  return (
    <View style={styles.hootHeader}>
      <View style={styles.hootHeader}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>
          @{username.split('.')[0]} •{" "}
          <Text style={styles.date}>{rightDate}</Text>
        </Text>
      </View>
      <Image resizeMode="cover" source={more} style={styles.more} />
    </View>
  );
};

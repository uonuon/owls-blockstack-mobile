import { Assets } from "assets";
import React, { useMemo } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { HootHeaderProps } from "./types";
import { formatDistanceToNowStrict } from "date-fns";
const {
  components: {
    hoot: { more },
  },
} = Assets.images;

export const HootHeader: React.FC<HootHeaderProps> = ({ date, name, username }) => {
  const rightDate = useMemo(() => formatDistanceToNowStrict(date), [date]);
  return (
    <View style={styles.hootHeader}>
      <View style={{ flexDirection: 'row',
      alignItems: 'center',}}>
        <Text style={[styles.name]}>{name}</Text>
        <Text style={styles.username}>
          @{username.split('.')[0]} •{" "}
          <Text style={styles.date}>{rightDate}</Text>
        </Text>
      </View>
      <Image resizeMode="cover" source={more} style={styles.more} />
    </View>
  );
};

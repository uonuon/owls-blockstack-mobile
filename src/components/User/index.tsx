import { Assets } from "assets";
import { useGetUserImage, useNavigationUtils, useTheme } from "hooks";
import React from "react";
import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import { IUser } from "shared";
import { useGetUserName } from "utils";

import styles from "./styles";

const {
  components: {
    header: { chevronLeftBlack },
  },
} = Assets.images;

export const User: React.FC<{ user: IUser }> = ({ user }) => {
  const {
    theme: { colors, fonts },
  } = useTheme();
  const navigation = useNavigationUtils();
  const userImage = useGetUserImage(user, styles.image);
  const username = useGetUserName(user)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigateTo({
            name: "UserProfile",
            params: { incomingUser: user },
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        {userImage}
        <View>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

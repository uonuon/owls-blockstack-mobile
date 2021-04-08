import { Assets } from "assets";
import { UserData } from "contexts";
import { ConnectionsStatuses, useGetUserImage, useNavigationUtils, useTheme } from "hooks";
import React, { useContext } from "react";
import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import { IUser } from "shared";
import { transact, useGetUserName } from "utils";

import styles from "./styles";

const {
  common: { check, cancel },
} = Assets.images;

export const PendingFollower: React.FC<{
  user: IUser;
}> = ({ user }) => {
  const {
    theme: { colors, fonts },
  } = useTheme();
  const navigation = useNavigationUtils();
  const userImage = useGetUserImage(user, styles.image);
  const username = useGetUserName(user);
  const { userData } = useContext(UserData);

  const acceptRequest = async () => {
    const userTxn = [
      {
        _id: user.connectionId || "connections",
        from: user?._id,
        to: userData?._id,
        status: ConnectionsStatuses.success,
      },
    ];
    return await transact({
      privateKey: userData?.appPrivateKey,
      myTxn: userTxn,
      authId: userData?.authId,
    })
  }
  const cancelRequest = async () => {
    const userTxn = [
      {
        _id: user.connectionId || "connections",
        from: user?._id,
        to: userData?._id,
        status: ConnectionsStatuses.rejected,
      },
    ];
    return await transact({
      privateKey: userData?.appPrivateKey,
      myTxn: userTxn,
      authId: userData?.authId,
    })
  }

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
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={acceptRequest} style={styles.accept}>
          <Image
            source={check}
            style={{ width: 15, height: 15, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={cancelRequest} style={styles.cancel}>
          <Image
            source={cancel}
            style={{ width: 15, height: 15, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Assets } from "assets";
import { UserData } from "contexts";
import {
  ConnectionsStatuses,
  ConnectionsStatusesMapper,
  defaultConfig,
  useGetUserImage,
  useNavigationUtils,
} from "hooks";
import { useRoute } from "@react-navigation/native";
import { useGetUserName } from "utils";
import { IUser } from "shared";
const {
  common: { chevron },
  screens: {
    profile: { calendar },
  },
  components: {
    hoot: { defaultAvatar },
  },
} = Assets.images;

const useProfileButtonActions = (
  userProfile: IUser,
  followers: IUser[],
  connection
) => {
  const { userData } = useContext(UserData);
  return useMemo(() => {
    if (userProfile._id === userData?._id) {
      return "Edit Profile";
    }
    if (!connection?.status) {
      return ConnectionsStatusesMapper.rejected;
    }
    return ConnectionsStatusesMapper[connection.status];
  }, [userData?._id, userProfile._id, followers, connection]);
};

export const ProfileHeader = ({
  followers,
  following,
  userProfile,
  fromProfile,
  followUserById,
  connection,
}) => {
  const { navigateTo, goBack } = useNavigationUtils();
  const userImage = useGetUserImage(userProfile, styles.image);
  const username = useGetUserName(userProfile);
  const { userData } = useContext(UserData);
  const buttonState = useProfileButtonActions(
    userProfile,
    followers,
    connection
  );
  const isFollowing = connection?.status === ConnectionsStatuses.success;
  const isPending = connection?.status === ConnectionsStatuses.pending;
  return (
    <View pointerEvents="box-none">
      {fromProfile && (
        <View
          style={{
            width: "100%",
            backgroundColor: "black",
            height: 56,
            justifyContent: "center",
          }}
        >
          <Pressable style={styles.backContainer} onPress={goBack}>
            <Image source={chevron} style={styles.chev} />
          </Pressable>
        </View>
      )}
      <LinearGradient
        colors={[
          "#eac7ac",
          "#efa785",
          "#fe502b",
          "#ac5a9f",
          "#9199da",
          "#3b97e6",
          "#3d88e9",
          "#02caeb",
        ]}
        style={styles.header}
      >
        <View style={styles.overlay}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {userImage}
            <View style={{ flexDirection: "column", width: "50%" }}>
              <Text style={styles.name}>{userProfile?.fullName} </Text>
              <Text style={styles.username}>@{username}</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  width: "95%",
                }}
              >
                <Image
                  style={{ width: 16, height: 16, resizeMode: "contain" }}
                  source={calendar}
                />
                <Text style={styles.date}> Joined September 2021</Text>
              </View>
              <Text style={styles.date}>{userProfile?.description}</Text>
              <View style={{ flexDirection: "row", marginTop: 16 }}>
                <Pressable
                  onPress={() =>
                    navigateTo({
                      name: "Followers",
                      params: {
                        users: followers.filter(
                          (user) => user._id !== userData._id
                        ),
                      },
                    })
                  }
                  style={styles.button}
                >
                  <Text style={styles.followersText}>
                    {followers.length - 1} Followers
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigateTo({
                      name: "Following",
                      params: {
                        users: following.filter(
                          (user) => user._id !== userData._id
                        ),
                      },
                    })
                  }
                  style={styles.button}
                >
                  <Text style={styles.followingText}>
                    {following.length - 1} Following
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              style={styles.buttonStyles}
              onPress={() => {
                if (userProfile._id === userData?._id) {
                  navigateTo({ name: "FillUserData" });
                } else {
                  followUserById(
                    userProfile._id,
                    isFollowing || isPending
                      ? ConnectionsStatuses.rejected
                      : userProfile.isPrivate
                      ? ConnectionsStatuses.pending
                      : ConnectionsStatuses.success,
                    connection?.connectionId
                  ).catch(() => alert("Something went wrong"));
                }
              }}
            >
              <Text style={{ fontSize: 11, color: "#0FBBEB" }}>
                {buttonState}
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

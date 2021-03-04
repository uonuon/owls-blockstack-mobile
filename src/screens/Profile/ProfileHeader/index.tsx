import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Assets } from "assets";
import { UserData } from "contexts";
import { defaultConfig, useGetUserImage, useNavigationUtils } from "hooks";
import { useRoute } from "@react-navigation/native";
import { useGetUserName } from "utils";
const {
  common: { chevron },
  screens: {
    profile: { calendar },
  },
  components: {
    hoot: { defaultAvatar },
  },
} = Assets.images;

export const ProfileHeader = ({
  followers,
  following,
  userProfile,
  fromProfile,
  followUserById,
}) => {
  const { navigateTo, goBack } = useNavigationUtils();
  const userImage = useGetUserImage(userProfile, styles.image);
  const username = useGetUserName(userProfile);
  const {userData} = useContext(UserData)
  let buttonState = userProfile._id === userData?._id ? 'Edit Profile':  following.filter((user: any) => user._id === userProfile._id).length > 0 ? 'Following': 'Follow';

  return (
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
      {fromProfile && (
        <Pressable onPress={goBack}>
          <Image source={chevron} style={styles.backButtonIcon} />
        </Pressable>
      )}
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
            style={{ flexDirection: "row", marginVertical: 8, width: "95%" }}
          >
            <Image
              style={{ width: 16, height: 16, resizeMode: "contain" }}
              source={calendar}
            />
            <Text style={styles.date}> Joined September 2018</Text>
          </View>
          <Text style={styles.date}>{userProfile?.description}</Text>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <Pressable
              onPress={() => navigateTo({ name: "Followers",params: { users: followers} })}
              style={styles.button}
            >
              <Text style={styles.followersText}>
                {followers.length} Followers
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigateTo({ name: "Following", params: { users: following}})}
              style={styles.button}
            >
              <Text style={styles.followingText}>
                {following.length} Following
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => {
            console.warn('Ehhh');
            followUserById(userProfile._id).then(() => alert('Success')).catch(() => alert('Something went wrong'))
          }}
        >
          <Text style={{ fontSize: 11, color: "#0FBBEB" }}>{buttonState}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

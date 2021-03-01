import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Assets } from "assets";
import { UserData } from "contexts";
import { defaultConfig, useGetUserImage, useNavigationUtils } from "hooks";
import { useRoute } from "@react-navigation/native";
const {
  common: {
    chevron,
  },
  screens: {
    profile: { calendar },
  },
  components: {
    hoot: { defaultAvatar },
  },
} = Assets.images;

export const ProfileHeader = ({ followers, following, userProfile, fromProfile }) => {
  const { navigateTo, goBack } = useNavigationUtils();
  const userImage = useGetUserImage(userProfile, styles.image);
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
      {fromProfile &&  <Pressable onPress={goBack}>
        <Image source={chevron} style={styles.backButtonIcon} />
      </Pressable>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {userImage}
        <View style={{ flexDirection: "column", width: "85%" }}>
          <Text style={styles.name}>
            {userProfile?.fullName}{" "}
            <Text style={styles.username}>
              @{userProfile?.username.split(".")[0]}
            </Text>
          </Text>
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
            <TouchableOpacity
              onPress={() => navigateTo({ name: "Followers" })}
              style={styles.button}
            >
              <Text style={styles.followersText}>
                {followers.length} Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo({ name: "Following" })}
              style={styles.button}
            >
              <Text style={styles.followingText}>
                {following.length} Following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

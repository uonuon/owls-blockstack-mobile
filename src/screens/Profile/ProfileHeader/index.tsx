import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Assets } from "assets";
import { UserData } from "contexts";
import { defaultConfig } from "hooks";
const {
  screens: {
    profile: { calendar },
  },
  components: {
    hoot: { avatar },
  },
} = Assets.images;

export const ProfileHeader = () => {
  const { userData } = useContext(UserData);
  const [userImage, setUserImage] = useState(avatar);
  
  useEffect(async () => {
    const gaiaURL = userData?.profile.apps[defaultConfig.appDomain];
    const data = await fetch(gaiaURL + userData?.avatar, {
      method: "GET",
    }).then(async (res) => res.json());
    setUserImage({uri: data});
  }, [userData?.avatar, userData?.profile]);

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
      <Image source={userImage} style={styles.image} />
      <View style={{ flexDirection: "column", width: "85%" }}>
        <Text style={styles.name}>
          {userData?.fullName}{" "}
          <Text style={styles.username}>
            @{userData?.username.split(".")[0]}
          </Text>
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 8, width: "95%" }}>
          <Image
            style={{ width: 16, height: 16, resizeMode: "contain" }}
            source={calendar}
          />
          <Text style={styles.date}> Joined September 2018</Text>
        </View>
        <Text style={styles.date}>{userData?.description}</Text>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.followersText}>118 Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.followingText}>118 Followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

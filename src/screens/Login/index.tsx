import React, { useContext, useEffect } from "react";
import {View, Image, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import { Assets } from "assets";
import { useLocalization, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

const {
  screens: {
    login: { logo, loginAvatar, logoMark, lock },
  },
} = Assets.images;
export const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLocalization();
  const { replace } = useNavigationUtils();

  const { success, failure, signIn, userData } = useContext(UserData);

  useEffect(() => {
    if (success) {
      if (userData?.fullName === undefined) {
        replace({
          name: "FillUserData",
        });
      } else {
        replace({
          name: "home",
        });
      }
    }
  }, [success, failure]);

  const onPressGetId = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.backgroundLogo} />
      {/* <Image source={loginAvatar} style={styles.logoAvatar} /> */}
      <View style={styles.textContainer}>
        <Text style={[styles.heading]}>
          One click sign in to Owls if you have universal login by Stacks.
        </Text>
        {/* <Text style={styles.desc}
          >
          Stacks ID provides user-controlled login and storage that enable you to take back control of your identity and data.
          </Text> */}
        <LinearGradient
          colors={[
            // "#eac7ac",
            // "#efa785",
            "#fe502b",
            "#ac5a9f",
            "#9199da",
            "#3b97e6",
            // "#3d88e9",
            // "#02caeb",
          ]}
          style={styles.continueButton}
        >
          <TouchableOpacity
            onPress={onPressGetId}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            disabled={(!success && !failure)}
          >
            <Image source={logoMark} style={styles.image} />
            <Text style={styles.buttonText}>Sign in with Blockstack</Text>
            {(!success && !failure) && <ActivityIndicator color={theme.colors.common.white} />}
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.containerFooter}>
          <Image source={lock} style={styles.image} />
          <Text style={styles.text}>
            You'll get a Secret Key that automatically encrypts everything you
            do
          </Text>
        </View>
      </View>
    </View>
  );
};

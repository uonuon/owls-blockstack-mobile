import React, { useContext, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  ImageBackground,
} from "react-native";
import { useLocalization, useNavigationUtils, useTheme } from "hooks";
import { LANGUAGES } from "shared";
import { en } from "i18n";
import { DefaultTheme } from "themes";
import { UserData } from "contexts";
import AsyncStorage from "@react-native-community/async-storage";
import { Assets } from "assets";
import RNBlockstackSdk from "react-native-blockstack";
import LinearGradient from "react-native-linear-gradient";
import { watermelonSync } from "src/db/sync";

const {
  screens: {
    splash: { backgroundLogo },
    login: { logo },
  },
} = Assets.images;

export const SplashScreen: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { success, failure, userData } = useContext(UserData);
  const { replace } = useNavigationUtils();
  const localization = useLocalization();

  const initLocalization = async () => {
    const translations = en;
    localization.setLanguage(LANGUAGES[0], translations);
  };

  const init = async () => {
    setTheme(DefaultTheme);
    initLocalization();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (success && userData) {
      if (userData?.fullName === undefined) {
        replace({
          name: "FillUserData",
        });
      } else {
        watermelonSync(userData, 0)
        replace({
          name: "home",
        });
      }
    } else if (failure) {
      replace({
        name: "login",
      });
    }
  }, [success, failure, userData]);

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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.elevation01dp,
      }}
    >
      <View style={{}}>
        <Image
          source={logo}
          style={{
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            marginTop: 40,
          }}
        >
          <ActivityIndicator
            color={theme.colors.common.white}
            size="large"
            style={{
              paddingTop: 20,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

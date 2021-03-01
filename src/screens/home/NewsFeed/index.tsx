import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Assets } from "assets";
import { defaultConfig, useHoots, useLocalization, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { Hoot } from "components";
import { ScreenParams } from "navigation";
import { HootProps } from "../../../components/Hoot/types";
import { IHoot } from "shared";

const {
  common: { gif, mic, photo, stats },
  components: {
    hoot: { defaultAvatar },
  },
  screens: {
    home: { home, homeDisabled, plus },
    login: { logo },
  },
} = Assets.images;

export const NewsFeed: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const { theme } = useTheme();
  const { getNewsFeed, newsFeedHoots } = useHoots();
  const navigation = useNavigationUtils();

  const { userData } = useContext(UserData);

  useEffect(() => {
    navigation.setOptions({
      title: "Home",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18 }}
          source={focused ? home : homeDisabled}
        />
      ),
    });
    getNewsFeed()
  }, []);
  const { navigateTo } = useNavigationUtils();

  const hootsHeader = () => (
    <TouchableOpacity
      onPress={() => navigateTo({ name: "WriteHoot" })}
      style={styles.writeHoot}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={defaultAvatar} style={styles.avatar} />
        <Text style={styles.whatHappen}>What’s happening?</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={photo} style={styles.icon} />
        <Image source={gif} style={styles.icon} />
        <Image source={stats} style={styles.icon} />
        <Image source={mic} style={[styles.icon, { marginRight: 0 }]} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.backgroundLogo} />
      </View>
      <FlatList
          data={newsFeedHoots}
          style={{flex: 1, width: '100%'}}
          ListHeaderComponent={hootsHeader}
          ListEmptyComponent={<View style={{marginTop: '50%', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white'}}>Seems you got no friends</Text></View>}
          renderItem={({ item }) => {
            const hoot: IHoot = item;
            return (
              <Hoot
              currentHoot={hoot}
              />
            );
          }}
          keyExtractor={(item: any) => item._id}
        />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigateTo({ name: "WriteHoot" })}
      >
        <Image
          source={plus}
          style={{ width: 24, height: 24, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

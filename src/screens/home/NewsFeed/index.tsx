import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Assets } from "assets";
import {
  useGetUserImage,
  useHoots,
  useNavigationUtils,
  useTheme,
} from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { ScreenParams } from "navigation";
import { Hoots } from "src/components/Hoots";
import { HootsQueriesTypes } from "shared/Queries";

const {
  common: {
    defaultAvatar,
    photo,
    gif,
    stats,
    mic
  },
  screens: {
    home: { home, homeDisabled, plus },
    login: { logo },
  },
} = Assets.images;

export const NewsFeed: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const navigation = useNavigationUtils();
  const { userData } = useContext(UserData);
  const { hasReachedEnd, data, loading,refresh, loveHoot, postData, loadMoreHoots } = useHoots({queryType: HootsQueriesTypes.NEWS_FEED_HOOTS, id: userData?._id || 0});
  const userImage = useGetUserImage(userData, styles.avatar);

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
  }, []);
  const { navigateTo } = useNavigationUtils();

  const hootsHeader = () => (
    <TouchableOpacity
    onPress={() => navigateTo({ name: "WriteHoot" ,params: {postData}})}
    style={styles.writeHoot}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {userImage}
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
      <Hoots
        hoots={data}
        loveHoot={loveHoot}
        loadMoreHoots={loadMoreHoots}
        hasReachedEnd={hasReachedEnd}
        refresh={refresh}
        isRefreshing={loading}
        retweetHoot={postData}
        ListHeaderComponent={hootsHeader}
        ListEmptyComponent={
          <View
            style={{
              marginTop: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Seems you got no friends</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigateTo({ name: "WriteHoot" ,params: {postData}})}
      >
        <Image
          source={plus}
          style={styles.plus}
        />
      </TouchableOpacity>
    </View>
  );
};

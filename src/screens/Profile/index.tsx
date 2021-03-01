import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Assets } from "assets";
import {
  defaultConfig,
  useHoots,
  useNavigationUtils,
  useProfile,
  useTheme,
  useUsers,
} from "hooks";
import { ScreenParams } from "navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import { ProfileHootsMedia } from "./ProfileHootsMedia";
import { ProfileHootsLikes } from "./ProfileHootsLikes";
import { ProfileHeader } from "./ProfileHeader";
import { UserData } from "contexts";
import { IHoot, IUser } from "shared";
import { HPageViewHoc } from "react-native-head-tab-view";
import { Hoot } from "components";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";

const HScrollView = HPageViewHoc(ScrollView);

const initialLayout = {
  width: Dimensions.get("window").width,
};
const {
  screens: {
    profile: { profile, profileDisabled },
  },
} = Assets.images;

const navigationRoutes = [
  {
    key: "hoots",
    title: "Hoots",
  },
  {
    key: "hoots_replies",
    title: "Hoots & Replies",
  },
  {
    key: "media",
    title: "Media",
  },
  {
    key: "likes",
    title: "Likes",
  },
];

export const Profile: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const navigation = useNavigationUtils();
  const { params } = useRoute<any>();
  const { theme } = useTheme();
  const {
    theme: { colors, fonts },
  } = useTheme();
  const [index, setIndex] = useState(0);
  const { userData } = useContext(UserData);
  const selectedUser = params?.incomingUser || (userData as IUser);
  const { profileHoots, currentFollowers, currentFollowing } = useProfile(
    selectedUser
  );

  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18 }}
          source={focused ? profile : profileDisabled}
        />
      ),
    });
  }, []);

  const ProfileHoots = useCallback(
    () => (
      <HScrollView index={0}>
        <FlatList
          data={profileHoots}
          style={styles.flatList}
          renderItem={({ item }) => {
            const hoot: IHoot = item;
            return <Hoot currentHoot={hoot} />;
          }}
          keyExtractor={(item: any) => item._id}
        />
      </HScrollView>
    ),
    [profileHoots]
  );

  const renderScene = useCallback(
    SceneMap({
      hoots: ProfileHoots,
      hoots_replies: ProfileHootsMedia,
      media: ProfileHootsMedia,
      likes: ProfileHootsLikes,
    }),
    [profileHoots]
  );

  const renderTabBar = useCallback(
    (props: any) => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.secondary }}
        activeColor={colors.secondary}
        tabStyle={{ height: 60, width: "auto" }}
        labelStyle={{
          fontSize: 16,
          fontFamily: theme.fonts.regular,
          fontWeight: "300",
          textTransform: "capitalize",
        }}
        inactiveColor={colors.onSurfaceMediumEmphasis}
        style={{ backgroundColor: colors.elevation01dp }}
      />
    ),
    []
  );

  const renderScrollHeader = useCallback(
    () => (
      <ProfileHeader
        userProfile={selectedUser}
        followers={currentFollowers}
        following={currentFollowing}
        fromProfile={params?.incomingUser ? true : false}
      />
    ),
    [selectedUser, currentFollowers, currentFollowing]
  );

  const makeHeaderHeight = useCallback(() => 192, []);

  return (
    <CollapsibleHeaderTabView
      makeHeaderHeight={makeHeaderHeight}
      headerRespond={true}
      tabbarHeight={45}
      renderTabBar={renderTabBar}
      renderScrollHeader={renderScrollHeader}
      navigationState={{ index, routes: navigationRoutes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

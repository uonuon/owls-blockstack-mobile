import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Assets } from "assets";
import { useNavigationUtils, useTheme } from "hooks";
import { ScreenParams } from "navigation";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import { ProfileHoots } from "./ProfileHoots";
import { HootsAndReplies } from "./HootsAndReplies";
import { ProfileHootsMedia } from "./ProfileHootsMedia";
import { ProfileHootsLikes } from "./ProfileHootsLikes";
import { ProfileHeader } from "./ProfileHeader";

const initialLayout = {
  width: Dimensions.get("window").width,
};
const {
  screens: {
    profile: { profile, profileDisabled, calendar },
  },
  components: {
    hoot: { avatar },
  },
} = Assets.images;

export const Profile: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const navigation = useNavigationUtils();
  const { theme } = useTheme();
  const {
    theme: { colors, fonts },
  } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
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
  ]);

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
    setRoutes([
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
    ]);
  }, []);

  const renderScene = SceneMap({
    hoots: ProfileHoots,
    hoots_replies: HootsAndReplies,
    media: ProfileHootsMedia,
    likes: ProfileHootsLikes,
  });

  const renderTabBar = (props: any) => (
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
  );

  return (
    <CollapsibleHeaderTabView
      makeHeaderHeight={() => 192}
      headerRespond={true}
      tabbarHeight={45}
      renderTabBar={renderTabBar}
      renderScrollHeader={() => <ProfileHeader />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

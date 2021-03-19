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
  Pressable,
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
import { Hoots } from "src/components/Hoots";
import { HootsQueriesTypes } from "shared/Queries";
import { TouchableOpacity } from "react-native-gesture-handler";

const HScrollView = HPageViewHoc(ScrollView);

const initialLayout = {
  width: Dimensions.get("window").width,
};
const {
  screens: {
    profile: { profile, profileDisabled },
  },
  common: { lock },
} = Assets.images;

const navigationRoutes = [
  {
    key: "hoots",
    title: "Hoots",
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
  const selectedUser = (params?.incomingUser as IUser) || (userData as IUser);
  const { currentFollowers, currentFollowing, followUserById } = useProfile(
    selectedUser
  );
  const { data, loading, loveHoot, postData, hasReachedEnd, loadMoreHoots } = useHoots({
    queryType: HootsQueriesTypes.USER_HOOTS,
    id: selectedUser?._id || 0,
  });

  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18, resizeMode: 'contain' }}
          source={focused ? profile : profileDisabled}
        />
      ),
    });
  }, []);

  const ProfileHoots = useCallback(
    () => (
      <HScrollView style={styles.flatList} index={0}>
        {selectedUser.isPrivate ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              padding: 8,
              width: "100%",
            }}
          >
            <Image
              source={lock}
              style={{ width: 56, height: 56, marginVertical: 32 }}
            />
            <Text
              style={{
                fontSize: 20,
                lineHeight: 24,
                color: theme.colors.common.white,
              }}
            >
              This account is private
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: theme.colors.onSurfaceMediumEmphasis,
                marginBottom: 20,
              }}
            >
              Stacks ID provides user-controlled login and storage that enable
              you to take back control of your identity and data.
            </Text>
            <Pressable
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.primaryLowerContrasted,
                padding: 16,
                borderRadius: 16,
              }}
              onPress={() => followUserById(selectedUser._id, 'pending')}
            >
              <Text style={{ color: "white" }}>SEND FOLLOW REQUEST</Text>
            </Pressable>
          </View>
        ) : (
          <Hoots  hoots={data} loveHoot={loveHoot} retweetHoot={postData} />
        )}
      </HScrollView>
    ),
    [data]
  );

  const ProfileMediaHoots = useCallback(
    () => (
      <HScrollView style={styles.flatList} index={1}>
        {/* <Hoots hasReachedEnd={hasReachedEnd} loadMoreHoots={loadMoreHoots} hoots={data} loveHoot={loveHoot} retweetHoot={postData} /> */}
      </HScrollView>
    ),
    [data]
  );

  const ProfileLikesHoots = useCallback(
    () => (
      <HScrollView style={styles.flatList} index={2}>
        {/* <Hoots hasReachedEnd={hasReachedEnd} loadMoreHoots={loadMoreHoots} hoots={data} loveHoot={loveHoot} retweetHoot={postData} /> */}
      </HScrollView>
    ),
    [data]
  );

  const renderScene = useCallback(
    SceneMap({
      hoots: ProfileHoots,
      media: ProfileHootsMedia,
      likes: ProfileHootsLikes,
    }),
    [data]
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
        followUserById={followUserById}
      />
    ),
    [selectedUser, currentFollowers, currentFollowing, userData]
  );

  const makeHeaderHeight = useCallback(() => params?.incomingUser ? 256 : 200, []);

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

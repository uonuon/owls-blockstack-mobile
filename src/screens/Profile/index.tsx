import { Assets } from "assets";
import {
  ConnectionsStatuses,
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
  ActivityIndicator,
} from "react-native";
import { ProfileHeader } from "./ProfileHeader";
import { UserData } from "contexts";
import { IHoot, IUser } from "shared";
import { HPageViewHoc } from "react-native-head-tab-view";
import { Hoot, RetweetedHoot } from "components";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { Hoots } from "src/components/Hoots";
import { HootsQueriesTypes } from "shared/Queries";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { ProfileHoots } from "./ProfileHoots";
import { useRealTime } from "src/hooks/useRealTime";

const {
  screens: {
    profile: { profile, profileDisabled },
  },
  common: { lock },
} = Assets.images;

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
  const {callBackFollowingUser} = useRealTime();
  const {
    currentFollowers,
    currentFollowing,
    followUserById,
    connection,
  } = useProfile(selectedUser, callBackFollowingUser);
  const {
    data,
    loading,
    loveHoot,
    postData,
    hasReachedEnd,
    loadMoreHoots,
    success,
    refresh,
  } = useHoots({
    queryType: HootsQueriesTypes.USER_HOOTS,
    id: selectedUser?._id || 0,
  });
  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18, resizeMode: "contain" }}
          source={focused ? profile : profileDisabled}
        />
      ),
    });
  }, []);

  const privateProfile = () => (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        width: "100%",
        backgroundColor: "black",
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
        Stacks ID provides user-controlled login and storage that enable you to
        take back control of your identity and data.
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
        onPress={() =>
          followUserById(
            selectedUser._id,
            ConnectionsStatuses.pending,
            connection?.connectionId
          )
        }
      >
        <Text style={{ color: "white" }}>SEND FOLLOW REQUEST</Text>
      </Pressable>
    </View>
  );

  const renderScrollHeader = useCallback(
    () => (
      <ProfileHeader
        userProfile={selectedUser}
        followers={currentFollowers}
        following={currentFollowing}
        fromProfile={params?.incomingUser ? true : false}
        followUserById={followUserById}
        connection={connection}
      />
    ),
    [selectedUser, currentFollowers, currentFollowing, userData, connection]
  );

  return (
    <Tabs.Container
      HeaderComponent={renderScrollHeader}
      headerHeight={params?.incomingUser ? 256 : 200} // optional
      TabBarComponent={(props) => (
        <MaterialTabBar
          {...props}
          tabStyle={{ backgroundColor: theme.colors.elevation01dp }}
          activeColor={theme.colors.primary}
          inactiveColor={theme.colors.onSurfaceMediumEmphasis}
        />
      )}
    >
      <Tabs.Tab name="Hoots">
        <ProfileHoots
          hoots={data}
          loveHoot={loveHoot}
          loadMoreHoots={loadMoreHoots}
          hasReachedEnd={hasReachedEnd}
          refresh={refresh}
          isRefreshing={loading}
          retweetHoot={postData}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Media">
        <ProfileHoots
          hoots={data}
          loveHoot={loveHoot}
          loadMoreHoots={loadMoreHoots}
          hasReachedEnd={hasReachedEnd}
          refresh={refresh}
          isRefreshing={loading}
          retweetHoot={postData}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Likes">
        <ProfileHoots
          hoots={data}
          loveHoot={loveHoot}
          loadMoreHoots={loadMoreHoots}
          hasReachedEnd={hasReachedEnd}
          refresh={refresh}
          isRefreshing={loading}
          retweetHoot={postData}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

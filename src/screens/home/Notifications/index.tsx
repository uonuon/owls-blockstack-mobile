import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Assets } from "assets";
import { useNavigationUtils, useTheme } from "hooks";
import styles from "./styles";
import { ScreenParams } from "navigation";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { query } from "utils";
import { queryPendingFollowers } from "shared/Queries";
import { useContext } from "react";
import { UserData } from "contexts";
import { User } from "components";
import { PendingFollower } from "src/components/PendingFollower";
import { usePushNotifications } from "src/hooks/useNotificationsHook";
import { checkNotifications, openSettings, requestNotifications } from "react-native-permissions";
import { Alert } from "react-native";
const initialLayout = { width: Dimensions.get("window").width };

const {
  common: {
    logo,
    notification,
    notificationActive,
    noNotifications,
    noRequests,
  },
} = Assets.images;

export const Notifications: React.FC<
  BottomTabScreenProps<ScreenParams>
> = () => {
  const [index, setIndex] = React.useState(0);
  const { userData } = useContext(UserData);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [granted, setGranted] = useState(false);
  usePushNotifications();
  const [routes] = React.useState([
    { key: "notifications", title: "Notifications" },
    { key: "followRequests", title: "Follow Requests" },
  ]);

  const { theme } = useTheme();
  const navigation = useNavigationUtils();

  useEffect(() => {
    query({
      myQuery: queryPendingFollowers(userData?._id),
      privateKey: userData?.appPrivateKey,
    }).then((res) => {
      setPendingRequests(
        res.data.map((fol: any) => ({
          ...fol.from,
          connectionId: fol._id,
          status: fol.status,
        }))
      );
    });
  }, [userData]);

  useEffect(() => {
    checkNotifications().then(({ status }) => {
      if (status === "granted") {
        setGranted(true);  
      }
    })
  },[])

  const handlePermission = useCallback(async () => {
    requestNotifications(["alert", "badge", "sound"]).then((permissions) => {
      if (permissions.status === "blocked") {
        Alert.alert(
          "Notifications Permissions",
          "Permissions denied, please go to settings to allow notifications",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Go Settings",
              onPress: () => {
                openSettings().catch(() =>
                  console.warn("cannot open settings")
                );
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else if (permissions.status === "granted") {
        setGranted(true);
      }
    });
  }, []);

  const FirstRoute = () => (
    <View>
      <View
        style={{
          marginTop: "40%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        { !granted &&
          <>
            <Text
              style={[
                styles.title,
                {
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              Notification Access
            </Text>
            <Text
              style={[
                styles.subtitle,
              ]}
            >
              Owls Doesn't send any of your content data in its
              notifications however we need your permission to notfiy you with
              new messages and friend requests
            </Text>
            <Pressable
              onPress={handlePermission}
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.primary,
                  width: "90%",
                },
              ]}
            >
              <Text
                style={{
                  color: theme.colors.common.white,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                Allow Notifications
              </Text>
            </Pressable>
          </>
        }
        {granted && (
          <>
            <Image
              source={noNotifications}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                color: "white",
                opacity: 0.6,
                marginTop: 25,
                fontWeight: "300",
                fontFamily: theme.fonts.headers,
                fontSize: 20,
              }}
            >
              You don’t have any notifications!
            </Text>
          </>
        )}
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, height: "100%" }}>
      <FlatList
        data={pendingRequests}
        style={{ flex: 1, width: "100%", height: "100%" }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: "40%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={noRequests}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                color: "white",
                opacity: 0.6,
                marginTop: 25,
                fontWeight: "300",
                fontFamily: theme.fonts.headers,
                fontSize: 20,
              }}
            >
              You don’t have any following requests?
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          return <PendingFollower user={item} />;
        }}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
  const renderScene = SceneMap({
    notifications: FirstRoute,
    followRequests: SecondRoute,
  });
  useEffect(() => {
    navigation.setOptions({
      title: "Notifications",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 24, height: 24 }}
          source={focused ? notificationActive : notification}
        />
      ),
    });
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.backgroundLogo} />
        <Text style={styles.title}>Notifications</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.colors.secondary }}
            activeColor={theme.colors.secondary}
            inactiveColor={theme.colors.onSurfaceMediumEmphasis}
            style={{ backgroundColor: theme.colors.elevation02dp }}
          />
        )}
      />
    </ScrollView>
  );
};

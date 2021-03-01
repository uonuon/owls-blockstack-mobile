import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { Assets } from "assets";
import { useGetUserImage, useLocalization, useNavigationUtils, useTheme, useUsers } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { Hoot } from "components";
import { ScreenParams } from "navigation";
import TabBarIcon from "../TabBarIcon";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const {
  common: { logo, searchIcon, chevron },
  components: {
    hoot: { defaultAvatar },
  },
  screens: {
    search: { search, searchDisabled },
  },
} = Assets.images;
export const Search: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const { theme } = useTheme();
  const navigation = useNavigationUtils();
  const [currentText, setText] = useState("");
  const [searchState, setSearchState] = useState(false);
  const { getUsers, users, followUserById } = useUsers();
  useEffect(() => {
    navigation.setOptions({
      title: "Search",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18 }}
          source={focused ? search : searchDisabled}
        />
      ),
    });
    getUsers();
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={styles.header}>
        {!searchState ? (
          <Image source={logo} style={styles.backgroundLogo} />
        ) : (
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => setSearchState(false)}
          >
            <Image source={chevron} style={styles.chev} />
          </TouchableOpacity>
        )}
        <View
          style={{ width: "78%", flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            multiline={true}
            placeholderTextColor="#6c6c6c"
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: theme.fonts.regular,
            }}
            numberOfLines={5}
            value={currentText}
            onTouchStart={() => setSearchState(true)}
            onChangeText={(text) => {setText(text.toLowerCase())}}
            placeholder="Search users and hashtags"
          />
        </View>
        <Image
          source={searchIcon}
          style={{ width: 20, resizeMode: "contain" }}
        />
      </View>
      {searchState ? (
        <View>
          <FlatList
            data={users.filter((data: any) => data.username.includes(currentText))}
            style={{ flex: 1, width: "100%" }}
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
            renderItem={({ item }) => {
              // const userImage = useGetUserImage(item, styles.image);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigateTo({name: 'UserProfile', params: {incomingUser: item}})}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  {userImage}
                  <View>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <Text style={styles.username}>
                      @{item.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              fontFamily: theme.fonts.headers,
              opacity: 0.6,
              marginTop: 16,
              marginLeft: 24,
              marginBottom: 16,
            }}
          >
            Most Trending Hashtags
          </Text>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              backgroundColor: theme.colors.elevation02dp,
              flexDirection: "row",
              marginBottom: 0.5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#006FB4",
                marginRight: 16,
                fontFamily: theme.fonts.regular,
              }}
            >
              1
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: theme.fonts.regular,
                  color: "#FFF",
                  opacity: 0.87,
                  marginBottom: 10,
                }}
              >
                Most Trending Hashtags
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFF",
                  opacity: 0.38,
                  fontFamily: theme.fonts.regular,
                }}
              >
                23K Hoots
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              backgroundColor: theme.colors.elevation02dp,
              flexDirection: "row",
              marginBottom: 0.5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#006FB4",
                marginRight: 16,
                fontFamily: theme.fonts.regular,
              }}
            >
              2
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFF",
                  opacity: 0.87,
                  fontFamily: theme.fonts.regular,
                  marginBottom: 10,
                }}
              >
                Most Trending Hashtags
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFF",
                  opacity: 0.38,
                  fontFamily: theme.fonts.regular,
                }}
              >
                23K Hoots
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              backgroundColor: theme.colors.elevation02dp,
              flexDirection: "row",
              marginBottom: 0.5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#006FB4",
                marginRight: 16,
                fontFamily: theme.fonts.regular,
              }}
            >
              3
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFF",
                  opacity: 0.87,
                  fontFamily: theme.fonts.regular,
                  marginBottom: 10,
                }}
              >
                Most Trending Hashtags
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFF",
                  opacity: 0.38,
                  fontFamily: theme.fonts.regular,
                }}
              >
                23K Hoots
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              opacity: 0.6,
              marginTop: 16,
              marginLeft: 24,
              fontFamily: theme.fonts.regular,
              marginBottom: 16,
            }}
          >
            Most Trending Hashtags
          </Text>
          <View style={{ borderTopWidth: 1, borderTopColor: "#1f1f1f" }}>
            {/* <Hoot /> */}
          </View>
        </>
      )}
    </ScrollView>
  );
};

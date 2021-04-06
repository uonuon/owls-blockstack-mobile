import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { Assets } from "assets";
import {
  useGetUserImage,
  useLocalization,
  useNavigationUtils,
  useTheme,
  useUsers,
} from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { Hoot, User } from "components";
import { ScreenParams } from "navigation";
import TabBarIcon from "../TabBarIcon";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import _ from "lodash";

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
  }, []);

  const onChangeText = (text: string) => {
    // setText(text)
    getUsers(text.trim());
  }
  const onChangeTextDelayed = _.debounce(onChangeText, 2000);
  return (
    <View style={styles.container}>
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
            onTouchStart={() => setSearchState(true)}
            onChangeText={onChangeTextDelayed}
            placeholder="Search users by username"
          />
        </View>
        <Image
          source={searchIcon}
          style={{ width: 20, resizeMode: "contain" }}
        />
      </View>
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
        Users
      </Text>
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
            <Text style={{ color: "white" }}>User not found</Text>
          </View>
        }
        renderItem={({ item }) => {
          return <User user={item} />;
        }}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
};

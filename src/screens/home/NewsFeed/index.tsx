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
import { useLocalization, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { Hoot } from "components";
import { ScreenParams } from "navigation";
import { HootProps } from "../../../components/Hoot/types";

export const DATA: HootProps[] = [
  {
    id: "bd7acbea-c1bs1-46c2-aed5-3ad53abb28ba",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys",
    date: Date.now(),
    likes: 120,
    name: "Mina Philemon",
    replies: 203,
    retweets: 1,
    username: "Philemono",
    image: "",
  },
  {
    id: "bd7acbea-c1bsd1-46c2-aed5-3ad53abb28ba",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: Date.now() - 1000000,
    likes: 110,
    name: "Mostafa amr",
    replies: 24,
    retweets: 1,
    username: "mostafa",
    image: "",
  },
  {
    id: "bd7acbea-c331bsd1-46c2-aed5-3ad53abb28ba",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: Date.now() - 2000,
    likes: 110,
    name: "Mostafa amr",
    replies: 24,
    retweets: 1,
    username: "mostafa",
    image: "",
  },
  {
    id: "bd7acbdea-c1bsd1-46c2-aed5-3ad53abb28ba",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: Date.now() - 1000000,
    likes: 110,
    name: "Mostafa amr",
    replies: 24,
    retweets: 1,
    username: "mostafa",
    image: "",
  },
  {
    id: "bd7aacbea-c331bsd1-46c2-aed5-3ad53abb28ba",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: Date.now() - 2000,
    likes: 110,
    name: "Mostafa amr",
    replies: 24,
    retweets: 1,
    username: "mostafa",
    image: "",
  },
];

const {
  common: { gif, mic, photo, stats },
  components: {
    hoot: { avatar },
  },
  screens: {
    home: { home, homeDisabled, plus },
    login: { logo },
  },
} = Assets.images;

export const NewsFeed: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const { theme } = useTheme();
  const { translate } = useLocalization();
  const { replace } = useNavigationUtils();
  const navigation = useNavigationUtils();

  const { success, failure, signIn } = useContext(UserData);

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
      onPress={() => navigateTo({ name: "WriteHoot" })}
      style={styles.writeHoot}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={avatar} style={styles.avatar} />
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
        data={DATA}
        ListHeaderComponent={hootsHeader}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              content={hoot.content}
              date={hoot.date}
              id={hoot.id}
              likes={hoot.likes}
              name={hoot.name}
              replies={hoot.replies}
              retweets={hoot.retweets}
              username={hoot.username}
              image={hoot.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
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

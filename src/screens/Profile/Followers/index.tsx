import { useRoute } from "@react-navigation/native";
import { Assets } from "assets";
import { User } from "components";
import { useNavigationUtils, useTheme } from "hooks";
import React from "react";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const {
  common: { chevron },
} = Assets.images;

export const Followers = () => {
  const { params } = useRoute();
  const { goBack } = useNavigationUtils();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Image source={chevron} style={styles.backgroundLogo} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginRight: 70,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#fff",
              fontFamily: theme.fonts.regular,
              opacity: 0.6,
            }}
          >
            Followers
          </Text>
        </View>
      </View>
      <FlatList
        data={params?.users || []}
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
          return <User user={item} />;
        }}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
};

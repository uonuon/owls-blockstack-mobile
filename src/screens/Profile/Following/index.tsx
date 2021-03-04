import { useRoute } from "@react-navigation/native";
import { User } from "components";
import React from "react";
import {
  FlatList,
  View,
  Text,
} from "react-native";
import styles from "./styles"


export const Following = () => {
  const { params } = useRoute()
  return (
    <View style={styles.container}>
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
              return (
                <User user={item}/>
              );
            }}
            keyExtractor={(item: any) => item._id}
          />
    </View>
  )
}
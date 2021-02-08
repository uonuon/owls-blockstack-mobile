import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Assets } from "assets";
import { useLocalization, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";

const {
  common: { publicImage, chevron, gif, mic, photo, stats },
  components: {
    hoot: { avatar },
  },
} = Assets.images;

export const WriteHoot: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLocalization();
  const { replace, goBack } = useNavigationUtils();
  const navigation = useNavigationUtils();

  const [currentText, setText] = useState("");
  const { success, failure, signIn } = useContext(UserData);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0  }>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Image source={chevron} style={styles.backgroundLogo} />
        </Pressable>
        <Pressable
          disabled={currentText.length === 0}
          style={[
            styles.postHoot,
            { backgroundColor: currentText.length > 0 ? "#0FBBEB" : "#004F93" },
          ]}
        >
          <Text
            style={[
              styles.hootText,
              { opacity: currentText.length > 0 ? 1 : 0.38 },
            ]}
          >
            Hoot
          </Text>
        </Pressable>
      </View>
      <View style={styles.writeHoot}>
        <View style={{ flexDirection: "row" }}>
          <Image source={avatar} style={styles.avatar} />
          <View style={{ width: "75%" }}>
            <TextInput
              multiline={true}
              placeholderTextColor="#6c6c6c"
              style={{ fontSize: 16, color: "white" }}
              numberOfLines={5}
              value={currentText}
              onChangeText={(text) => {
                if (text.length <= 180) {
                  setText(text);
                }
              }}
              placeholder="What's happening?"
            />
          </View>
        </View>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#121212",
            borderRadius: 8,
            width: 32,
            height: 32,
          }}
        >
          <Image
            source={publicImage}
            style={[styles.icon, { marginRight: 0 }]}
          />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={photo} style={styles.icon} />
          <Image source={gif} style={styles.icon} />
          <Image source={stats} style={styles.icon} />
          <Image source={mic} style={[styles.icon, { marginRight: 0 }]} />
        </View>
        <View>
          <Text style={{ color: "white" }}>{currentText.length}/180</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

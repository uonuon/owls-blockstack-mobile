import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Assets } from "assets";
import { useHoots, useLocalization, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import {launchImageLibrary} from 'react-native-image-picker';

const {
  common: { publicImage, chevron, gif, mic, photo, stats },
  components: {
    hoot: { defaultAvatar },
  },
} = Assets.images;

export const WriteHoot: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLocalization();
  const { replace, goBack } = useNavigationUtils();
  const navigation = useNavigationUtils();

  const [currentText, setText] = useState("");
  const [currentImage, setImage] = useState("");
  const { success, failure, signIn } = useContext(UserData);
  const { postHoot } = useHoots()

  useEffect(() => {}, [currentImage])

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 46 : 0  }>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Image source={chevron} style={styles.backgroundLogo} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={currentText.length === 0}
          onPress={() => postHoot(currentText, currentImage).then(() => goBack())}
          style={[
            styles.postHoot,
            { backgroundColor: currentText.length > 0 ? theme.colors.secondaryHighContrasted : theme.colors.secondary },
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
        </TouchableOpacity>
      </View>
      <View style={styles.writeHoot}>
        <View style={{ flexDirection: "row" }}>
          <Image source={defaultAvatar} style={styles.avatar} />
          <View style={{ width: "78%" }}>
            <TextInput
              multiline={true}
              placeholderTextColor="#6c6c6c"
              style={{ fontSize: 20, color: "white", fontFamily: theme.fonts.regular, }}
              numberOfLines={5}
              value={currentText}
              focusable={true}
              onChangeText={(text) => {
                if (text.length <= 180) {
                  setText(text);
                }
              }}
              placeholder="What's happening?"
            />
            {currentImage.length > 0 && <Image style={{width: '100%', borderRadius: 16, marginTop: 24, height: 180}} source={{uri: currentImage}} />}
          </View>
        </View>
        <TouchableOpacity
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
            style={[styles.privacy, { marginRight: 0 }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => launchImageLibrary({mediaType: 'photo', includeBase64: true, quality: 0.5, }, (image) => {
           if (!image.didCancel) {
            setImage(image.uri!)
           }
          })}><Image source=  {photo} style={styles.icon} /></TouchableOpacity>
          <Image source={gif} style={styles.icon2} />
          <Image source={stats} style={styles.icon3} />
          <Image source={mic} style={[styles.icon4, { marginRight: 0 }]} />
        </View>
        <View>
          <Text style={{ color: "white" }}>{currentText.length}/180</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

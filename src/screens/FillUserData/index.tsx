import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Image, Text, ScrollView, ActivityIndicator } from "react-native";
import { Assets } from "assets";
import {
  useGetUserImage,
  useNavigationUtils,
  useProgressState,
  useTheme,
} from "hooks";
import styles from "./styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import RNBlockstackSdk from "react-native-blockstack";
import { useSetUserData } from "hooks";
import { Platform } from "react-native";
import { generateGUID, transact } from "utils";
import { UserData } from "contexts";
import { IUser } from "shared";

const {
  common: { avatar },
} = Assets.images;

export const FillUserData: React.FC = () => {
  const { theme } = useTheme();
  const {
    common: { chevron },
  } = Assets.images;
  const { goBack, replace } = useNavigationUtils();
  const { userData, setUserData } = useContext(UserData);
  const [name, setName] = useState<string>(userData?.fullName || '');
  const [desc, setDesc] = useState<string>(userData?.description || '');
  const userImage = useGetUserImage(userData, styles.avatar);
  const [currentImage, setImage] = useState<string>(userData?.avatar ?? "");
  const { setLoading, loading, setSuccess, setFailure } = useProgressState();
  const disabledText =
    currentImage.length === 0 || name.trim().length === 0 || desc.trim().length === 0;
  const setData = useCallback(async () => {
    try {
      setLoading();
      const id = generateGUID();
      const fullImagePath = `user/avatar/${id}`;
      await RNBlockstackSdk.putFile(
        fullImagePath,
        JSON.stringify(currentImage),
        {
          encrypt: false,
        }
      );
      const updatedUserTxn = [
        {
          _id: ["_user/auth", ["_auth/id", userData?.authId]],
          fullName: name,
          description: desc,
          avatar: fullImagePath,
        },
      ];
      await transact({
        privateKey: userData?.appPrivateKey,
        myTxn: updatedUserTxn,
        authId: userData?.authId,
      }).then(() => {
        setUserData((oldUserData: IUser) => ({
          ...oldUserData,
          fullName: name,
          description: desc,
          avatar: fullImagePath,
        }));
        replace({ name: "home" }, { name: "Profile" });
        setSuccess();
      });
    } catch (error) {
      alert("Something went wrong");
      setFailure();
    }
  }, [name, desc, currentImage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Image source={chevron} style={{ width: 22, height: 24 }} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={styles.headerText}>Fill the rest of your info</Text>
        <Text style={styles.description}>Start by selecting your avatar</Text>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              launchImageLibrary(
                {
                  mediaType: "photo",
                  includeBase64: true,
                  quality: 0.5,
                  maxHeight: 500,
                  maxWidth: 500,
                },
                (image) => {
                  if (!image.didCancel) {
                    const compressedImageWithType = `data:${
                      Platform.OS === "android"
                        ? "image/jpeg"
                        : image.type || "image/jpeg"
                    };base64,${image.base64}`;
                    setImage(compressedImageWithType);
                  }
                }
              )
            }
          >
            <Image style={styles.avatar} source={currentImage.length > 0 ? {uri: currentImage} : avatar} />
          </TouchableOpacity>
          <View style={styles.input}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              value={name}
              placeholderTextColor="#6c6c6c"
              style={styles.textInput}
              onChangeText={(text) => setName(text)}
              placeholder="What's your name?"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              placeholderTextColor="#6c6c6c"
              value={desc}
              style={styles.textInput}
              onChangeText={(text) => setDesc(text)}
              placeholder="Write something about you"
            />
          </View>
          <TouchableOpacity
            onPress={setData}
            disabled={disabledText}
            style={[
              styles.button,
              {
                backgroundColor: !disabledText
                  ? theme.colors.primary
                  : theme.colors.onSurfaceDisabled,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator
                color={theme.colors.common.white}
                size="small"
              />
            ) : (
              <Text style={styles.buttonText}>Yay! Start Using Hoots Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

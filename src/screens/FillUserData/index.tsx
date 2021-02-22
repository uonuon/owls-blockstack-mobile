import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Image, Text, ScrollView, ActivityIndicator } from "react-native";
import { Assets } from "assets";
import { useNavigationUtils, useProgressState, useTheme } from "hooks";
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
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [currentImage, setImage] = useState<string>("");
  const { userData, setUserData } = useContext(UserData)
  const {
    setLoading,
    loading,
    setSuccess,
    setFailure,
  } = useProgressState();
  const disabledText =
    currentImage.length === 0 || name.length === 0 || desc.length === 0;

  const setData = useCallback(async () => {
    try {
      setLoading()
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
          _id: userData?._id as number,
          fullName: name,
          description: desc,
          avatar: fullImagePath,
        },
      ];
      await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: updatedUserTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      }).then(() => {
        setUserData((oldUserData: IUser) => ({...oldUserData, ...updatedUserTxn }))
        replace({ name: "home" })
        setSuccess()
      })
    } catch (error) {
      alert("Something went wrong");
      setFailure()
    }
  },[name, desc, currentImage]);


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
                    console.log(compressedImageWithType);
                  }
                }
              )
            }
          >
            {currentImage.length > 0 ? (
              <Image style={styles.avatar} source={{ uri: currentImage }} />
            ) : (
              <Image style={styles.avatar} source={avatar} />
            )}
          </TouchableOpacity>
          <View style={styles.input}>
            <Text style={styles.text}>Name</Text>
            <TextInput
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

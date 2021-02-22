import { useContext, useEffect, useState } from "react";
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact, generateGUID } from "utils";
import { IUser } from "shared";
import { useProgressState } from "../useProgressState";
import { UserData } from "contexts";
import { defaultConfig } from "hooks";

export const useSetUserData = () => {
  const {
    setFailure,
    setLoading,
    setSuccess,
    success,
    failure,
    loading,
  } = useProgressState();
  const { userData } = useContext(UserData)
  useEffect(() => {}, []);

  const uploadImage = async (imageBase64: string) => {
    try {
     
    } catch (error) {
      setFailure();
    }
  };

  const setUserData = async (
    imageBase64: string,
    fullName: string,
    description: string
  ) => {
    try {
      setLoading();
      const id = generateGUID();
      const fullImagePath = `user/avatar/${id}`;
      await RNBlockstackSdk.putFile(
        fullImagePath,
        JSON.stringify(imageBase64),
        {
          encrypt: false,
        }
      );
      const updatedUserTxn = [
        {
          _id: userData?._id,
          fullName,
          description,
          avatar: fullImagePath,
        },
      ];
      await transact({
        privateKey:
          "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
        myTxn: updatedUserTxn,
        authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
      });
      setSuccess()
    } catch (error) {
      setFailure()
    }
  };

  return {
    uploadImage,
    loading,
    success,
    failure,
    setUserData,
  };
};

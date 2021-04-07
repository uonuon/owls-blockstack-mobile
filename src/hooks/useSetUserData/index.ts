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
        privateKey: userData?.appPrivateKey,
        myTxn: updatedUserTxn,
        authId: userData?.authId,
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

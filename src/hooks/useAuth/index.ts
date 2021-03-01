import { useCallback, useEffect, useState } from "react";
// import {
//   UserSession,
//   AppConfig,
// } from 'blockstack/lib';
import RNBlockstackSdk from "react-native-blockstack";
import { query, getPublicKeyFromPrivate, transact } from "utils";
import { IUser } from "shared";
import AsyncStorage from "@react-native-community/async-storage";
import { DeviceEventEmitter, Platform } from "react-native";
import { defaultConfig } from "./types";
import { useProgressState } from "../useProgressState";

const authenticatorPrivateKey =
  "58573df95d622a41bb55ede42256ef39e95a88b5bfcb96636c0fa8555219f5cd";
const authenticatorAuthId = "TfJecBZR7DzqD9hvQLYLrVKuHiUgKDceR8d";

export const useAuthentication = () => {
  const [userData, setUserData] = useState<IUser | undefined>(undefined);
  const [pendingAuth, setPendingAuth] = useState<boolean>(false);
  const {
    setFailure,
    setLoading,
    setSuccess,
    success,
    failure,
  } = useProgressState();

  useEffect(() => {
    createSession();
    DeviceEventEmitter.addListener("url", (e: any) => {
      if (e.url && !pendingAuth) {
        setPendingAuth(true);
        const query = e.url.split(":");
        if (query.length > 1) {
          const parts = query[1].split("=");
          if (parts.length > 1) {
            RNBlockstackSdk.handlePendingSignIn(parts[1]).then(() => {
              createSession();
              setPendingAuth(false);
            });
          }
        }
      }
    });
  }, []);

  const createSession = async () => {
    setLoading();
    const hasSession = await RNBlockstackSdk.hasSession();
    if (!hasSession.hasSession) {
      await RNBlockstackSdk.createSession(defaultConfig);
    }

    const signedIn = await RNBlockstackSdk.isUserSignedIn();
    if (signedIn.signedIn) {
      try {
        const session = await RNBlockstackSdk.loadUserData();
        const appPrivateKey =
          Platform.OS === "android"
            ? session.appPrivateKey
            : session.private_key;

        const { username, profile } = session;
        const myQuery = {
          select: { "*": { _compact: true } },
          from: ["_user/username", username],
        };
        const user = await query({
          myQuery,
          privateKey: authenticatorPrivateKey,
        }).then((res) => res.data[0]);

        const publicKey = getPublicKeyFromPrivate(appPrivateKey);
        // @ts-ignore
        const authId = window.fluree.crypto.account_id_from_public(publicKey);
        if (user) {
          const updatedUserTxn = [
            {
              _id: user._id,
              profile,
            },
          ];
          await transact({
            privateKey:
              "d9735fc879e0611cc9ff413215751fa2146aa3974da87bf529efccb24e52875a",
            myTxn: updatedUserTxn,
            authId: "TfBsAgyuBjA1ynqBX89ewaXii5hAJK4eN1P",
          });
        } else {
          const authTxn = [
            {
              _id: "_auth",
              id: authId,
              // roles: [['_role/id', 'adminRole']],
            },
          ];
          const userTxn = [
            {
              _id: "_user",
              username,
              profile,
              createdAt: "#(now)",
              auth: [["_auth/id", authId]],
            },
          ];
          await transact({
            privateKey: authenticatorPrivateKey,
            myTxn: authTxn,
            authId: authenticatorAuthId,
          });
          await transact({
            privateKey: appPrivateKey,
            myTxn: userTxn,
            authId,
          });
        }
        setUserData({
          ...session,
          appPrivateKey,
          ...(user || {}),
          authId,
          publicKey: publicKey,
        });
        setSuccess();
      } catch (e) {
        console.log(e);
        setFailure();
      }
    } else {
      setFailure();
    }
  };

  const signIn = async () => {
    await RNBlockstackSdk.signIn();
    createSession();
  }

  const signOut = async () => {
    setFailure();
    await RNBlockstackSdk.signUserOut();
    return Promise;
  }

  return {
    signIn,
    signOut,
    userData,
    setUserData,
    success,
    failure,
  };
};

export * from "./types";

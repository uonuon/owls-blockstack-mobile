import React, { useContext, useEffect } from "react";
import OneSignal from "react-native-onesignal";
import Config from "react-native-config";
import { UserData } from "contexts";
import { checkNotifications } from "react-native-permissions";
import { useNavigationUtils } from "../useNavigationUtils";

export const usePushNotifications = () => {
  const { userData } = useContext(UserData);
  const { navigate, replace } = useNavigationUtils();

  useEffect(() => {
    checkNotifications().then(({ status }) => {
      if (status === "granted") {
        OneSignal.setLocationShared(false);
        if (userData) {
          OneSignal.setAppId('8535e162-d853-453e-9c45-ca00a6545809');
          OneSignal.setLogLevel(6, 0);
          OneSignal.setNotificationWillShowInForegroundHandler(
            (notifReceivedEvent) => {
              const notif = notifReceivedEvent.getNotification();
              console.warn(notif);
            }
          );
          OneSignal.setNotificationOpenedHandler(({ notification }) => {
            console.warn(notification);
            OneSignal.setExternalUserId(
              userData?.publicKey.toString(),
              userData?.publicKey.toString(),
              (results: any) => {
                if (results.push && results.push.success) {
                  console.log(
                    "Results of setting external user id push status:"
                  );
                  console.log(results.push.success);
                }
              }
            );
          });
        }
      }
    });
  }, []);
};

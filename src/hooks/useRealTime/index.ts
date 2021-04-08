import { watermelonSync } from './../../db/sync/index';
import { forVerticalIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import { UserData } from "contexts";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { createStore } from "reusable";
import { io } from "socket.io-client";

export const useRealTime = createStore(() => {
  const { userData } = useContext(UserData);
  const [hootsMapper, setHootsMapper] = useState<{ [x: string]: number }>({});

  const settersMap = {
    tweet: ({ tempId, transactionID, transactionFlake }) => {
      setHootsMapper({...hootsMapper, [tempId]: transactionID, hoot: transactionFlake })
    },
  };

  const cb = (
    eventData: {
      flakes: [];
      txns: {
        [x: string]: {
          status: number;
          error: string;
          tempids: { [x: string]: number };
        };
      };
    },
    lastEventTime: number
  ) => {
    const flakesArr = eventData.flakes;
    let flake;
    let error;
    let called;
    let transactionFlake;
    for (flake of flakesArr) {
      if (flake[1] === 106) {
        transactionFlake = JSON.parse(flake[2]).tx;
      }
      if (flake[1] === 109) {
        error = true;
      }
      if (flake[1] === 108) {
        called = true;
        const txId = JSON.parse(flake[2]);
        const setter = Object.keys(txId)[0].split("$")[0];
        const tempId = Object.keys(txId)[0].split("$")[1];
        const transactionID = Object.values(txId)[0];
        if (settersMap[setter]) {
          settersMap[setter]({
            transactionID,
            tempId,
            transactionFlake,
          });
        }
      }
    }
    if (!error && !called) {
      // edit transactions
    }
  };
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === "active" && userData) {
        // re-activate syncing
      }
    },
    [userData]
  );
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (userData && appStateVisible === "active") {
      const socket = io("http://192.168.8.105:3000");
      watermelonSync(userData);
      socket.on("fluree_event", ({ data, lastEventTime }: any) => {
        cb(data, lastEventTime);
      });
      return () => {
        socket.off("fluree_event");
        socket.disconnect();
      };
    }
    return undefined;
  }, [userData, appStateVisible]);

  return {
    hootsMapper,
    setHootsMapper,
  }
});

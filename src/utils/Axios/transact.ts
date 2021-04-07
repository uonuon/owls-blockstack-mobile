import Config from 'react-native-config';
import axios from './axios';
import {
  AxiosReturn,
} from './types';
import * as Requests from './requests';
import {
  query,
} from './query';
import 'shared/fluree';

function signTransaction(auth, db, fuel, nonce, privateKey, tx) {
  const dbLower = "test/twoyarabyeshtaghl"
  const cmd = {
    type: 'tx',
    db: dbLower,
    tx: JSON.parse(tx),
    auth,
    fuel: Number(fuel),
    nonce: Number(nonce),
  };
  const stringifiedCmd = JSON.stringify(cmd);
  const sig = window.fluree.crypto.sign_message(stringifiedCmd, privateKey);

  return {
    cmd: stringifiedCmd, sig,
  };
}

export const transact = ({
  myTxn, privateKey, authId,
}): AxiosReturn<{}> => {
  const fuel = 100000;
  const nonce = Math.floor(Math.random() * 1000);
  const tx = JSON.stringify(myTxn);
  const command = signTransaction(authId, 'test/twoyarabyeshtaghl', fuel, nonce, privateKey, tx);
  return axios.post(Requests.transact, JSON.stringify(command), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    const qr = {
      select: '?err', where: [['?tx', '_tx/id', res.data], ['?tx', '_tx/error', '?err']],
    };
    return query({
      myQuery: qr, privateKey,
    });
  })
    .then((res) => {
      if (res.data.length === 0) {
        return res;
      }
      throw res;
    });
};

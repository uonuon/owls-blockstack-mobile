import Config from 'react-native-config';
import axios from './axios';
import * as Requests from './requests';
import {
  signQuery,
} from './helpers';

const queryType = 'query';
export const blockQuery = ({
  block, privateKey,
}) => {
  // @ts-ignore
  const signedQuery = signQuery(
    privateKey,
    JSON.stringify({
      select: [
        '?hash',
        '?maxBlock',
        {
          '?s': [{
            '_block/transactions': ['id'],
          }],
        },
      ],
      block,
      where: [
        ['?s', '_block/number', '?bNum'],
        ['?maxBlock', '#(max ?bNum)'],
        ['?s', '_block/number', '?maxBlock'],
        ['?s', '_block/hash', '?hash'],
      ],
    }),
    queryType,
    null,
    'test/twoyarabyeshtaghl',
  );
  return axios
    .post(Requests.query, signedQuery.body, {
      method: 'POST',
      headers: signedQuery.headers,
    })
    .then(({
      data,
    }) => {
      const res = data[0];
      const [blockHash, blockNumber, blockTxs] = res;
      const txId = (blockTxs['_block/transactions'] || []).reduce(
        (acc, next) => acc || next.id,
        '',
      );
      return {
        blockHash, blockNumber, txId,
      };
    });
};

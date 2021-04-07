import axios from './axios';
import * as Requests from './requests';
import {
  signQuery,
} from './helpers';

const queryType = 'multi-query';
export const multiQuery = ({
  myQueries, privateKey,
}) => {
  const signedQueries = signQuery(privateKey, JSON.stringify(myQueries), queryType, null, 'test/twoyarabyeshtaghl');
  return axios.post(Requests.multiQuery, signedQueries.body, {
    method: 'POST',
    headers: signedQueries.headers,
  });
};

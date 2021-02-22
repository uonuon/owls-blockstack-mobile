import axios from './axios';
import * as Requests from './requests';
import {
  signQuery,
} from './helpers';

const queryType = 'query';
export const query = ({
  myQuery, privateKey,
}) => {
  const signedQuery = signQuery(privateKey, JSON.stringify(myQuery), queryType, null, 'test/one');
  return axios.post(Requests.query, signedQuery.body, {
    method: 'POST',
    headers: signedQuery.headers,
  });
};

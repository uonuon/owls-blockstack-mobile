import axios,
{
  AxiosError,
  AxiosResponse,
} from 'axios';

const handleSuccess = (res: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => res;
const handleError = (error: AxiosError) => {
  throw error;
};

const instance = axios.create({
  baseURL: 'http://192.168.1.68:8090',
  headers: {
    'Content-Type': 'application/json',
  },

});

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;

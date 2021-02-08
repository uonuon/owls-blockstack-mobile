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
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },

});

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;

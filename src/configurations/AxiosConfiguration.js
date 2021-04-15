import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090"
});

axiosInstance.interceptors.request.use (
  request => {
    return request;
  },
  error => {
    return Promise.reject (error);
  }
);

axiosInstance.interceptors.response.use (
  response => {
    return response;
  },
  error => {
    if(error.toJSON().message === 'Network Error'){
      toast.error('Não conseguimos estalabecer a conexão com o servidor, por favor, tente novamente mais tarde!');
      return Promise.reject (error);
  }
    return Promise.reject (error);
  }
);

export default axiosInstance;

import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const checkDuplicateId = async (
  checkedId: string,
): Promise<AxiosResponse> => {
  return await axios.get(`/api/auth/signup/check/${checkedId}`);
};

export const signUpApi = async (
  newUser: AuthValues,
): Promise<AxiosResponse> => {
  return await axios.post('/api/auth/signup', newUser);
};

export const loginApi = async (
  logInUser: LoginValues,
): Promise<AxiosResponse> => {
  return await axios.post('/api/auth/login', logInUser);
};

interface Token {
  headers: {
    authorization: string;
  };
}

const token = localStorage.getItem('token');
const headers: Token = { headers: { authorization: `Bearer ${token}` } };

export const getUserByToken = async (): Promise<AxiosResponse> => {
  return await axios.get('/api/auth', headers);
};

export const addSubscriptionApi = async (
  newSubscription: SubscriptionInputValues,
): Promise<AxiosResponse> => {
  return await axios.put(
    `/api/auth/subscription/add`,
    newSubscription,
    headers,
  );
};

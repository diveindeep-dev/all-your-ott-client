import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const checkDuplicateId = async (checkedId: string) => {
  try {
    const res = await axios.get(`/api/auth/signup/check/${checkedId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const signUpApi = async (newUser: AuthValues) => {
  try {
    const res = await axios.post('/api/auth/signup', newUser);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const loginApi = async (logInUser: LoginValues) => {
  try {
    const res = await axios.post('/api/auth/login', logInUser);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    return error.response;
  }
};

import { atom } from 'recoil';

export const initialAuth: Auth = {
  isAuthenticated: false,
  loginUser: null,
};

export const authState = atom({
  key: 'loginState',
  default: initialAuth,
});

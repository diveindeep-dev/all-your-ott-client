import { atom } from 'recoil';

export const initialAuth: Auth = {
  isAuthenticated: false,
  _id: null,
  name: null,
};

export const initialLoginUser: LoginUser = null;

export const authState = atom<Auth>({
  key: 'authState',
  default: initialAuth,
});

export const loginUserState = atom<LoginUser>({
  key: 'loginState',
  default: initialLoginUser,
});

import { useQuery, useQueryClient } from 'react-query';
import { getUserByToken } from './api';
import { authState, loginUserState } from '../state';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const resetAuthState = useResetRecoilState(authState);
  const setAuthState = useSetRecoilState(authState);
  const setLoginUserState = useSetRecoilState(loginUserState);
  const resetLoginUserState = useResetRecoilState(loginUserState);

  const useToken = () => {
    const token = localStorage.getItem('token');

    useQuery(['auth'], getUserByToken, {
      onSuccess: ({ data }) => {
        setAuthState({
          isAuthenticated: true,
          _id: data.loginUser._id,
          name: data.loginUser.name,
        });
        setLoginUserState(data.loginUser);
      },
      onError: () => {
        setAuthState({ isAuthenticated: false, _id: null, name: null });
        setLoginUserState(null);
        localStorage.removeItem('token');
      },
      retry: false,
      enabled: !!token,
    });
  };

  const logout = () => {
    resetAuthState();
    resetLoginUserState();
    localStorage.removeItem('token');
    queryClient.removeQueries(['auth']);
  };

  return { useToken, logout };
};

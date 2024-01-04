import { useQuery, useQueryClient } from 'react-query';
import { getUserByToken } from './api';
import { authState } from '../state';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const resetAuthState = useResetRecoilState(authState);
  const setAuthState = useSetRecoilState(authState);

  const useToken = () => {
    const token = localStorage.getItem('token');

    useQuery(['user'], getUserByToken, {
      onSuccess: ({ data }) => {
        setAuthState({ isAuthenticated: true, loginUser: data.loginUser });
      },
      onError: () => {
        setAuthState({ isAuthenticated: false, loginUser: null });
      },
      retry: false,
      enabled: !!token,
    });
  };

  const logout = () => {
    resetAuthState();
    localStorage.removeItem('token');
    queryClient.removeQueries(['user']);
  };

  return { useToken, logout };
};

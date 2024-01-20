import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from './features/state';
import { useAuth } from './features/auth/useAuth';
import Layout from './layouts';
import Index from './pages';
import Signup from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import GlobalStyle from './styles/Global';
import Subscription from './pages/subscription';

function App() {
  const { isAuthenticated } = useRecoilValue(authState);
  const { useToken } = useAuth();

  useToken();

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate replace to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

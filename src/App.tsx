import { Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import Index from './pages';
import Signup from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import GlobalStyle from './styles/Global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

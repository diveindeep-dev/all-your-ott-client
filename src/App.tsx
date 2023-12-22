import { Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import Index from './pages';
import GlobalStyle from './styles/Global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

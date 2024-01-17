import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div id="App">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

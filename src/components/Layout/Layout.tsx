import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';
import Footer from '@/components/Footer/Footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
        <main>
          {children}
        </main>
      <Footer/>
    </>
  );
};

export default Layout;

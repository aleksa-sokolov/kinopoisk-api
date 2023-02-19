import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/components/Layout/Layout';
import { persistor, store } from '@/store/store';
import { ConfigProvider, Input } from 'antd';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import 'antd/dist/reset.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#22A39F',
          },
        }}
      >
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </ConfigProvider>
    </Provider>
  );
}

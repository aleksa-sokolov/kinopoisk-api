import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import Layout from "@/components/Layout/Layout";

import {persistor, store} from "@/store/store";
import type {AppProps} from 'next/app';
import '../styles/globals.scss';



export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

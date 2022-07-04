import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { createContext, useState } from "react";
import Nav from "../components/Nav";
import { APP_ID, SERVER_URL } from "../config";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;

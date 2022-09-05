import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { createContext, useState } from "react";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  const SERVER_URL = process.env.SERVER_URL
  const APP_ID = process.env.APP_ID
  
  return (
    <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;

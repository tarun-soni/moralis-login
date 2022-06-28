import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { createContext, useState } from "react";
import Nav from "../components/Nav";

const serverURL = "https://bqmsd3mbuzw3.usemoralis.com:2053/server";
const appId = "UqtF2waT8WusYshMd7ZO4WyDdCKbau9VU7GUApiz";

function MyApp({ Component, pageProps }) {
  const contenxtState = {
    isAuthenticated: false,
    isAuthenticating: false,
    user: null,
  };

  return (
    <MoralisProvider serverUrl={serverURL} appId={appId}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;

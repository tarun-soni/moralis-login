import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://ygco4f333pox.usemoralis.com:2053/server"
      appId="Yn2SDJ0UtbHhX465dQdCHTAycMdXSn2GZmHtHB17"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;

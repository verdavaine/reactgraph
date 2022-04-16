import "../styles/globals.css";
import { WunderGraphProvider } from "../components/generated/provider";
import type { AppProps } from "next/app";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WunderGraphProvider
      endpoint={baseURL}
      extraHeaders={{ "X-WunderGraph": "IsAwesome" }}
    >
      <Component {...pageProps} />
    </WunderGraphProvider>
  );
}

export default MyApp;

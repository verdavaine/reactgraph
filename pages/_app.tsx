import "../styles/globals.css";
import { WunderGraphProvider } from "../components/generated/provider";
import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/updateuser">Update User</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
          <li>
            <a href="/testquery">Test Query</a>
          </li>
        </ul>
      </nav>
      <WunderGraphProvider
        endpoint={baseURL}
        extraHeaders={{ "X-WunderGraph": "IsAwesome" }}
      >
        <Component {...pageProps} />
      </WunderGraphProvider>
    </>
  );
}

export default MyApp;

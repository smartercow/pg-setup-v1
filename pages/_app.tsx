import "../styles/global-styles.scss";
import "../styles/main-styles.scss";
import type { AppProps } from "next/app";
import MainLayout from "@components/layout/main-layout";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </RecoilRoot>
  );
}

export default MyApp;

import { Html, Head, Main, NextScript } from "next/document";
import { isDevelopment } from "@lib/utils/env";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={`${isDevelopment ? "debug-screens" : ""}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

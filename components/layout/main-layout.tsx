import Header from "@components/header/header";
import Footer from "@components/footer/footer";
import type { LayoutProps } from "./layout";

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main className="extent">{children}</main>
      <Footer />
    </>
  );
}

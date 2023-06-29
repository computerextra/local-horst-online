import "bootstrap/dist/css/bootstrap.min.css";
import { type AppType } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Navigation from "~/Components/Navigation";
import "~/styles/global.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);
  return (
    <>
      <Head>
        <title>LocalHorst v7</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Container fluid>
        <Navigation />
        <Component {...pageProps} />
      </Container>
    </>
  );
};

export default api.withTRPC(MyApp);

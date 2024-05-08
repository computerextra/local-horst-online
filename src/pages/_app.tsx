import "@uploadthing/react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "~/Layout/Menu";
import "~/style.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main>
        <Menu />
        <Container fluid className="mt-5">
          <Component {...pageProps} />
        </Container>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

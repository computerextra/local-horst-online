import Head from "next/head";
import Link from "next/link";
import { Container } from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function Inventur() {
  const Years = api.Inventur.getYears.useQuery();
  const { isAdmin } = useAdmin();

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  return (
    <>
      <Head>
        <title>Inventur | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Inventur oder so</h1>
        <ul>
          {Years.data?.map((y) => (
            <li key={y}>
              <Link href={"/Service/Inventur/" + y}>{y}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

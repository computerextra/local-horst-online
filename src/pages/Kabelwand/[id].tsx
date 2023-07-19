import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import CableNav from "~/Components/CableNavs";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function KabelBearbeiten() {
  const id = useRouter().query.id as string;
  const KabelRes = api.Kabelwand.getOneKabel.useQuery(id);
  const Kabel = KabelRes.data;

  if (KabelRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Kabel?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand" />
        <div>{id}</div>;
      </Container>
    </>
  );
}

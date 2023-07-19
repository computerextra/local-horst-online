import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function LaengeBearbeiten() {
  const id = useRouter().query.id as string;
  const LaengeRes = api.Kabelwand.getLength.useQuery(id);
  const Laenge = LaengeRes.data;

  if (LaengeRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Laenge?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

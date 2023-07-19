import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function ReiheBearbeiten() {
  const id = useRouter().query.id as string;
  const ReiheRes = api.Kabelwand.getRow.useQuery(id);
  const Reihe = ReiheRes.data;

  if (ReiheRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Reihe?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

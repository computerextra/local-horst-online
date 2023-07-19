import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

// TODO: ALLES

export default function FachBearbeiten() {
  const id = useRouter().query.id as string;
  const FachRes = api.Kabelwand.getCompartment.useQuery(id);
  const Fach = FachRes.data;

  if (FachRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Fach?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

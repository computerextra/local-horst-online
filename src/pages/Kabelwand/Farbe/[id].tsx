import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

// TODO: ALLES

export default function FarbeBearbeiten() {
  const id = useRouter().query.id as string;
  const FarbeRes = api.Kabelwand.getColor.useQuery(id);
  const Farbe = FarbeRes.data;

  if (FarbeRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Farbe?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

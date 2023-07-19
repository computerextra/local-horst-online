import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function RegalBearbeiten() {
  const id = useRouter().query.id as string;
  const RegalRes = api.Kabelwand.getShelf.useQuery(id);
  const Regal = RegalRes.data;

  if (RegalRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Regal?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function OutputBearbeiten() {
  const id = useRouter().query.id as string;
  const OutputRes = api.Kabelwand.getOutput.useQuery(id);
  const Output = OutputRes.data;

  if (OutputRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Output?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

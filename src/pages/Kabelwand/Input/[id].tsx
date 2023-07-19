import Head from "next/head";
import { useRouter } from "next/router";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function InputBearbeiten() {
  const id = useRouter().query.id as string;
  const InputRes = api.Kabelwand.getInput.useQuery(id);
  const Input = InputRes.data;

  if (InputRes.isLoading) return <LoadingSpinner />;
  return (
    <>
      <Head>
        <title>{Input?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <div>{id}</div>;
    </>
  );
}

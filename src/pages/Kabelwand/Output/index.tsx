import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Outputs() {
  const OutputRes = api.Kabelwand.getCompartments.useQuery();
  const Outputs = OutputRes.data;

  if (OutputRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Outputs | LocalHorst v7</title>
      </Head>
      <div>
        {Outputs?.map((Output) => (
          <p key={Output.id}>{Output.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

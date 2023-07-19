import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Laengen() {
  const LängeRes = api.Kabelwand.getLengths.useQuery();
  const Längen = LängeRes.data;

  if (LängeRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Längen | LocalHorst v7</title>
      </Head>
      <div>
        {Längen?.map((Länge) => (
          <p key={Länge.id}>{Länge.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

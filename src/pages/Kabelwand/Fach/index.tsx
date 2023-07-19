import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Faecher() {
  const FachRes = api.Kabelwand.getCompartments.useQuery();
  const Faecher = FachRes.data;

  if (FachRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Fächer | LocalHorst v7</title>
      </Head>
      <div>
        {Faecher?.map((Fach) => (
          <p key={Fach.id}>{Fach.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

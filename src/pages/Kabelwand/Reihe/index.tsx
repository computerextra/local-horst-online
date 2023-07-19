import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Reihen() {
  const ReiheRes = api.Kabelwand.getRows.useQuery();
  const Reihen = ReiheRes.data;

  if (ReiheRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Reihen | LocalHorst v7</title>
      </Head>
      <div>
        {Reihen?.map((Reihe) => (
          <p key={Reihe.id}>{Reihe.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

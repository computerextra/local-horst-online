import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Farben() {
  const FarbeRes = api.Kabelwand.getColors.useQuery();
  const Farben = FarbeRes.data;

  if (FarbeRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Farben | LocalHorst v7</title>
      </Head>
      <div>
        {Farben?.map((Farbe) => (
          <p key={Farbe.id}>{Farbe.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

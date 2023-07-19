import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Regale() {
  const RegalRes = api.Kabelwand.getShelfs.useQuery();
  const Regale = RegalRes.data;

  if (RegalRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Regale | LocalHorst v7</title>
      </Head>
      <div>
        {Regale?.map((Regal) => (
          <p key={Regal.id}>{Regal.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

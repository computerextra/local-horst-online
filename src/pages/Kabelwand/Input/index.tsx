import Head from "next/head";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: ALLES
export default function Inputs() {
  const InputRes = api.Kabelwand.getInputs.useQuery();
  const Inputs = InputRes.data;

  if (InputRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Alle Inputs | LocalHorst v7</title>
      </Head>
      <div>
        {Inputs?.map((Input) => (
          <p key={Input.id}>{Input.Name}</p>
        ))}
      </div>
      ;
    </>
  );
}

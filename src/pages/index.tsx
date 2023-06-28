import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>LocalHorst v7</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <div>
          <h1>
            Create <span>T3</span> App
          </h1>
          <div>
            <Link
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank">
              <h3>First Steps →</h3>
              <div>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              href="https://create.t3.gg/en/introduction"
              target="_blank">
              <h3>Documentation →</h3>
              <div>
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
        </div>
      </main>
    </>
  );
}

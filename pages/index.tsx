import Head from "next/head";
import RiveController from "@/components/RiveController";
import styles from "@/styles/Home.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>Rive Demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RiveController src="https://public.rive.app/hosted/245641/90235/aq_SGwPXHU6eo2b3Yce0fg.riv" />
      </main>
    </>
  );
}

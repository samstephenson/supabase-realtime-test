import Head from "next/head";

import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [meetings, setMeetings] = useState([]);
  const [localTranscript, setLocalTranscript] = useState("");
  useEffect(() => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "meetings" },
        payload => {
          setMeetings(payload.new);
          console.log("Change received!", payload);
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    supabase
      .from("meetings")
      .update({ transcript_device: localTranscript })
      .eq("id", "90ea83ff-2ca1-45bc-8beb-5df938903ee3")
      .then(({ data, error }) => {
        if (error) throw error;
        console.log("Meeting updated!", data);
      });
  }, [localTranscript]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"grid grid-cols-2 divide-y items-stretch"}>
        <div className="p-4">
          <h1 className="font-bold">Local Transript</h1>
          <textarea
            value={localTranscript}
            onChange={e => setLocalTranscript(e.target.value)}
            className="w-full h-64 border"
            placeholder="Type transcript"
          />
        </div>
        <div className="p-4 overflow-y-scroll h-96">
          <h1 className="font-bold">Supabase transcript</h1>
          <p className="pb-16">{meetings.transcript_device}</p>
        </div>
        {/* <pre className="text-xs p-4">{JSON.stringify(meetings, null, 2)}</pre> */}
      </main>
    </div>
  );
}

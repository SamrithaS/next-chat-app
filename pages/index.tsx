import { useEffect, useState } from "react";
import Form from "../components/form";
import { supabase } from "../helpers/supabase";
import HomeComponent from "../components/home";
import { userType } from "../types/types";

export default function Home() {
  const [session, setSession] = useState<any>();
  const [messageSession, setMessageSession] = useState();

  useEffect(() => {
    setSession(supabase.auth.session() as any);
    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    const subscription = supabase
      .from("message")
      .on("INSERT", (payload: any) => {
        setMessageSession(payload);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div className="h-full">
      {session ? (
        <HomeComponent user={session.user} messageSession={messageSession} />
      ) : (
        <Form isRegisterPage={false} />
      )}
    </div>
  );
}

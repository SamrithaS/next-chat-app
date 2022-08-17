import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { supabase } from "../helpers/supabase";

function MyApp({ Component, pageProps }: AppProps) {
 
  return <Component {...pageProps} />;
}

export default MyApp;

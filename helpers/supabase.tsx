import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl or supabaseAnonKey not defined");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

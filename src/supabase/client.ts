import { createClient } from "@supabase/supabase-js";
let VITE_SUPABASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_SUPABASE_URL
  : import.meta.env.VITE_SUPABASE_URL_DEV;
let VITE_SUPABASE_SECRET_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_SUPABASE_SECRET_KEY
  : import.meta.env.VITE_SUPABASE_SECRET_KEY_DEV;
const client = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_SECRET_KEY);

export default client;

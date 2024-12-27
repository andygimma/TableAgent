import { createClient } from "@supabase/supabase-js";
import { VITE_SUPABASE_SECRET_KEY, VITE_SUPABASE_URL } from "../utils/constants";

const client = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_SECRET_KEY);

export default client;

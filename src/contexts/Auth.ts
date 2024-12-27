import { createContext } from "react";
// import supabaseClient from "../services/supabase";
import { Session } from "@supabase/supabase-js";

// let loggedIn = false;

// const { data } = await supabaseClient.auth.getUser();
// if (data?.user?.id) {
//   loggedIn = true;
// }

const AuthContext = createContext<Session | null>(null);

export default AuthContext;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import supabaseClient from "./services/supabase";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/Auth";
import { Session } from "@supabase/supabase-js";
import { handleLogout } from "./App";

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {isLoading && <div>Loading...</div>}
      <AuthContext.Provider value={session}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

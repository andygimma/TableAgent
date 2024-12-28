import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import supabaseClient from "./services/supabase";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/Auth";
import { Session } from "@supabase/supabase-js";
import ProtectedRoute from "./session-routes/ProtectedRoute";
import AuthenticationRoute from "./session-routes/AuthenticationRoute";

function App() {
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
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    supabaseClient.auth.signOut();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <AuthContext.Provider value={session}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthenticationRoute>
                  <Login />
                </AuthenticationRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthenticationRoute>
                  <Signup />
                </AuthenticationRoute>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<>404</>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;

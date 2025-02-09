import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import supabaseClient from "./services/supabase";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/Auth";
import RestaurantContext from "./contexts/Restaurant";
import { Session } from "@supabase/supabase-js";
import ProtectedRoute from "./session-routes/ProtectedRoute";
import AuthenticationRoute from "./session-routes/AuthenticationRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthContext.Provider value={session}>
        <RestaurantContext>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route element={<AuthenticationRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<>404</>} />
            </Routes>
            <Footer />
          </Router>
        </RestaurantContext>
      </AuthContext.Provider>
    </>
  );
}

export default App;

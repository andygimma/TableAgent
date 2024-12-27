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
// NOTHHING HERE

// const [count, setCount] = useState(0);
// const [user, setUser] = useState<SetStateAction<User | null>>();

// useEffect(() => {
//   async function getAuth() {
// const { data } = await supabase.auth.getUser();
//     setUser(data.user);
//   }
//   getAuth();

//   const { data } = supabase.auth.onAuthStateChange((event, session) => {
//     console.log(event, session);

//     if (event === "INITIAL_SESSION") {
//       console.log("INITIAL_SESSION ***");
//       // handle initial session
//     } else if (event === "SIGNED_IN") {
//       // handle sign in event
//     } else if (event === "SIGNED_OUT") {
//       console.log("SIGNED_OUT ***");
//       // handle sign out event
//     } else if (event === "PASSWORD_RECOVERY") {
//       // handle password recovery event
//     } else if (event === "TOKEN_REFRESHED") {
//       // handle token refreshed event
//     } else if (event === "USER_UPDATED") {
//       // handle user updated event
//     }
//   });
// }, []);

const handleLogout = async () => {
  const data = await supabaseClient.auth.signOut();
  console.log({ data });
};

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
      <button onClick={handleLogout}>Logout</button>
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

export default App;

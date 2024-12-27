import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import supabase from "./supabase/client";

// const [count, setCount] = useState(0);
// const [user, setUser] = useState<SetStateAction<User | null>>();

// useEffect(() => {
//   async function getAuth() {
//     const { data } = await supabase.auth.getUser();
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

// async function login() {
//   // supabase.auth.onAuthStateChange *******************
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: "andrewgimma@a.com",
//     password: "4!i{Gh£|9.^2",
//   });
//   if (error) {
//     console.log(error.message);
//   }
//   console.log({ data, error });
// }

// async function logout() {
//   const { error } = await supabase.auth.signOut();
//   console.log({ error });
// }

// async function signup() {
//   const { data, error } = await supabase.auth.signUp({
//     email: "andy@protonmail.com",
//     password: "example-password",
//     options: {
//       data: {
//         first_name: "Andy",
//         age: 27,
//       },
//     },
//   });
//   console.log({ data, error });
// }

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

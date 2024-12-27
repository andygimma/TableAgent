import { useEffect, useState, useContext } from "react";
import supabaseClient from "../services/supabase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/Auth";

export default function Signup() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const loggedIn = useContext(AuthContext);
  console.log("Signup", loggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (loggedIn) {
      console.log("HELLO");
      navigate("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.log(error.message);
      }
      console.log({ data });
      setData(data);
    };
    fetchCurrentUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: "Andy",
        },
      },
    });

    console.log({ data, error });
    // TODO Handle error
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

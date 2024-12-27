import { useEffect, useState, useContext } from "react";
import supabaseClient from "../services/supabase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/Auth";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const loggedIn = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
      }
      setData(data);
    };
    fetchCurrentUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast(error.message, {
        theme: "dark",
      });
      return;
    }
  };
  return (
    <div>
      <ToastContainer />
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

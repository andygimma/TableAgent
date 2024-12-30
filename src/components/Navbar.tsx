import { useContext } from "react";
import AuthContext from "../contexts/Auth";
import supabaseClient from "../services/supabase";
import { Link } from "react-router-dom";

export default function Navbar() {
  const session = useContext(AuthContext);
  const handleLogout = async () => {
    supabaseClient.auth.signOut();
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">
        <Link to="/dashboard" className="logo-link">
          TableAgent
        </Link>
      </label>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        {session ? (
          <>
            {" "}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

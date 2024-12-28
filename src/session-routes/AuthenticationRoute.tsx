import { useContext } from "react";
import AuthContext from "../contexts/Auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticationRoute() {
  const session = useContext(AuthContext);
  return !session ? <Outlet /> : <Navigate to="/dashboard" />;
}

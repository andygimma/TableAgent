import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/Auth";

export default function ProtectedRoute() {
  const session = useContext(AuthContext);
  console.log({ session }, "PROTECTED ROUTE");
  return session ? <Outlet /> : <Navigate to="/login" />;
}

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/Auth";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const session = useContext(AuthContext);
  console.log(session, 122);
  const navigate = useNavigate();
  useEffect(() => {
    if (session === null) {
      navigate("/login");
    }
  }, [session]);
  return <>{children}</>;
}

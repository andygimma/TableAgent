import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/Auth";

type Props = {
  children: React.ReactNode;
};

export default function AuthenticationRoute({ children }: Props) {
  const session = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (session != null) {
      navigate("/dashboard");
    }
  }, [session]);
  return <>{children}</>;
}

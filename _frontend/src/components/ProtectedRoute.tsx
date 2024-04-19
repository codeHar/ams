import { ReactNode, useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { getToken } = useContext(AuthContext);

  return getToken() ? children : <Navigate to="/login" replace />;
};

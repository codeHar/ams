import { ReactNode, createContext, useState } from "react";

type UserDataType = {
  userId: number;
  name: string;
  token: string;
};

type AuthType = {
  auth: UserDataType | null;
  setAuth: (data: UserDataType) => void;
};

const AuthContext = createContext<AuthType | null>(null);

const getData = () => {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<UserDataType | null>(getData());

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

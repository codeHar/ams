import { ReactNode, createContext, useState } from "react";

type UserDataType = {
  userId?: number;
  name: string;
  token: string;
};

type AuthType = {
  auth: UserDataType | null;
  setAuthData: (data: UserDataType) => void;
  getToken: () => string | undefined;
  getUserName: () => string | undefined;
  getUserId: () => number | undefined;
  logOut: () => void;
};

const initialValue: AuthType = {
  auth: {
    name: "",
    token: "",
  },
  setAuthData: () => {},
  getToken: () => "",
  getUserName: () => "",
  getUserId: () => undefined,
  logOut: () => {},
};

const AuthContext = createContext<AuthType>(initialValue);

const getData = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<UserDataType | null>(getData());

  const setAuthData = (data: UserDataType | null) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const getToken = () => {
    return auth?.token;
  };

  const getUserName = () => {
    return auth?.name;
  };

  const getUserId = () => {
    return auth?.userId;
  };

  const logOut = () => {
    localStorage.removeItem("auth");
    setAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuthData, getToken, getUserName, getUserId, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

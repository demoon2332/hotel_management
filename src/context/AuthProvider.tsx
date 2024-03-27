import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  auth: {
    accessToken?: string;
    expirationTime?: number;
    [key: string]: any;
  };
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
  isAuthenticated: () => boolean;
  login:(data: {accessToken: string; refreshToken?: string}) => void
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    accessToken: "",
  },
  setAuth: () => {},
  isAuthenticated: () => false,
  login: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function checkTokenExpiration(token: string): boolean {
  const decodedToken: any = jwtDecode(token);
  const currentTime: number = new Date().getTime() / 1000;
  return decodedToken?.exp && currentTime <= decodedToken?.exp;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>({});

  const login = (data: { accessToken: string; refreshToken?: string }) => {
    const decodedToken: any = jwtDecode(data.accessToken);
    setAuth({
      accessToken: data.accessToken,
      expirationTime: decodedToken.exp,
      ...decodedToken.payload,
    });
  };

  const getAuth = () => {
    return auth;
  };

  const isAuthenticated = () => {
    return auth.accessToken && checkTokenExpiration(auth?.accessToken);
  };

  const logout = () => {
    setAuth({});
    localStorage.removeItem("infotel_token");
  };


  useEffect(() => {
    if (auth?.accessToken) {
      if (checkTokenExpiration(auth.accessToken)) {
        localStorage.setItem("infotel_token", auth.accessToken);
      }
    }
  }, [auth]);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      logout,
      getAuth,
      isAuthenticated,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

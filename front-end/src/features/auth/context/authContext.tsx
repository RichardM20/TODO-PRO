"use client";

import { AuthContextType, IAuthUser } from "@auth/types/auth.type";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthUser>();

  const setUserLogged = (newUser: IAuthUser) => {
    setUser(newUser);
  };

  const logOut = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserLogged,
        isAuthenticated: !!user?.accessToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};

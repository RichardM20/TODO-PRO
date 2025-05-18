"use client";

import { createContext, useContext, useState } from "react";

import { AuthContextType } from "@auth/types/auth.type";
import { IUser } from "@features/auth/types/user.type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  const setUserLogged = (newUser: IUser) => {
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

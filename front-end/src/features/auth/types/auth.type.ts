import { IUser } from "./user.type";

export type AuthContextType = {
  isAuthenticated: boolean;
  logOut: () => void;
  setUserLogged: (newUser: IAuthUser) => void;
  user: IAuthUser | undefined;
};

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  name?: string;
}



export interface IAuthUser {
  accessToken: string;
  user: IUser;
}

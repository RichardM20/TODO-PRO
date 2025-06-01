import { IUser } from "./user.type";

export type AuthContextType = {
  user?: IUser;
  setUserLogged: (user: IUser) => void;
  logOut: () => void;
};

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  name?: string;
}

import {
  IAuthUser,
  ILoginPayload,
  IRegisterPayload,
} from "@auth/types/auth.type";

import HttpServer from "@core/httpServer";
import { GenericResponse } from "../../../shared/types/response.type";

class AuthService {
  static login(payload: ILoginPayload): Promise<GenericResponse<IAuthUser>> {
    return HttpServer.post<GenericResponse<IAuthUser>>("auth/login", payload);
  }

  static register(
    payload: IRegisterPayload
  ): Promise<GenericResponse<IAuthUser>> {
    return HttpServer.post<GenericResponse<IAuthUser>>(
      "auth/register",
      payload
    );
  }
}

export default AuthService;

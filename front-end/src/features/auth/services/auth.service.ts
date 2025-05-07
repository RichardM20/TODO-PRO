import HttpServer from "@core/HttpServer";

import { IAuthUser, ILoginPayload, IRegisterPayload } from "@auth-types/auth.type";

class AuthService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  private static ROUTE = "auth";

  private static get fullUrl() {
    return `${this.BASE_URL}/${this.ROUTE}`;
  }

  static login(payload: ILoginPayload): Promise<IAuthUser> {
    return HttpServer.post<IAuthUser>(
      `${this.fullUrl}/login`,
      payload
    );
  }

  static register(payload: IRegisterPayload): Promise<IAuthUser> {
    return HttpServer.post<IAuthUser>(
      `${this.fullUrl}/register`,
      payload
    );
  }
}

export default AuthService;

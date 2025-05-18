import { Request, Response } from "express";

import AuthService from "@services/auth.service";
import { ApiError } from "@utils/errors/api_errors";
import { HttpBadResponse, HttpResponse } from "@utils/http_response";
import logger from "@utils/logger";
import { setTokenCookie } from "@utils/set_cookie";
import { AuthRequest } from "types/auth.type";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken } = await this.authService.login(
        email,
        password
      );

      setTokenCookie(res, accessToken);
      HttpResponse(res, 200, "sucess", user);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, "Internal server error", null);
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const { accessToken, user } = await this.authService.register(
        name,
        email,
        password
      );

      setTokenCookie(res, accessToken);
      HttpResponse(res, 200, "sucess", user);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, "Internal server error", null);
      }
    }
  }

  async refreshMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.uid ?? "";
      const user = await this.authService.refreshMe(userId);

      HttpResponse(res, 200, "sucess", user);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, "Internal server error", null);
      }
    }
  }
}

export default AuthController;

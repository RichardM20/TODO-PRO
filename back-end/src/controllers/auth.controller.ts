import { Request, Response } from "express";

import AuthService from "@services/auth.service";
import { ApiError } from "@utils/errors/api_errors";
import { HttpBadResponse, HttpResponse } from "@utils/http_response";
import logger from "@utils/logger";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userLogged = await this.authService.login(email, password);
      HttpResponse(res, 200, "sucess", userLogged);
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

      const userRegistered = await this.authService.register(
        name,
        email,
        password
      );

      HttpResponse(res, 200, "sucess", userRegistered);
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

import { Response } from "express";

import { ApiError } from "@utils/errors/api_errors";
import { HttpBadResponse, HttpResponse } from "@utils/http_response";

import logger from "@utils/logger";
import { AuthRequest } from "types/auth.type";
import TypeService from "../services/type.service";
import { IType } from "../types/type.types";

class TypeController {
  private typeService: TypeService;

  constructor(typeService: TypeService) {
    this.typeService = typeService;
  }

  async getTypes(req: AuthRequest, res: Response) {
    const uid = req.uid;

    try {
      const types = await this.typeService.getTypes(uid!);

      HttpResponse(res, 200, "sucess", types);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }

  async addType(req: AuthRequest, res: Response) {
    const type: IType = req.body;

    const userId = req.uid ?? "";

    try {
      await this.typeService.addType(userId, type);
      HttpResponse(res, 200, "sucess", true);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }
}

export default TypeController;

import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "@models/user.model";
import { HttpBadResponse } from "@utils/http_response";
import logger from "@utils/logger";
import { AuthRequest } from "types/auth.type";

const validateJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT as string);

    if (typeof decoded !== "object" || !("uid" in decoded)) {
      return HttpBadResponse(
        res,
        401,
        "Access token invalid - Missing uid",
        null
      );
    }

    const { uid } = decoded as JwtPayload;

    req.uid = uid;

    const user = await User.findById(uid);

    if (!user) {
      return HttpBadResponse(
        res,
        401,
        "Access token invalid - Incorret user",
        null
      );
    }
    next();
  } catch (error) {
    logger.error(error);
    return HttpBadResponse(res, 401, "Access token invalid", null);
  }
};

export default validateJWT;
import ENV from "@config/env.config";
import { Response } from "express";

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600000,
  });
};

import mongoose from "mongoose";


import { HttpBadResponse } from "@utils/http_response";
import { AuthRequest } from "types/auth.type";

const validateMongoID = (req: AuthRequest, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return HttpBadResponse(res, 400, "the id is invalid", null);
  }
  next();
};

export default validateMongoID;

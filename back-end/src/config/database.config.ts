import mongoose from "mongoose";

import logger from "@utils/logger";
import ENV from "./env.config";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_CNN as string);
    logger.info("DB Connected");
  } catch (error) {
    logger.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectDB;

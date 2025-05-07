import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const NODE_ENV=process.env.NODE_ENV || "dev";

const envSource = path.resolve(process.cwd(), `.env.${NODE_ENV}`);

if(fs.existsSync(envSource)){
    dotenv.config({path:envSource})
}else{
    dotenv.config()
}

export const ENV={
    NODE_ENV,
    PORT:process.env.PORT || 3000,
    MONGODB_CNN:process.env.MONGODB_CNN,
    SECRET_JWT:process.env.SECRET_JWT,
    LOG_LEVEL:process.env.LOG_LEVEL,
};


export default ENV;
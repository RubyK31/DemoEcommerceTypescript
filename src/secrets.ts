import * as dotenv from "dotenv";
//initialise
dotenv.config({path:'.env'})

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET!
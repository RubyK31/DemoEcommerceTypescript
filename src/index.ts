import 'module-alias/register';
import * as express from "express";
import {Express, Request, Response} from "express";
import { PORT } from "@secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "@middlewares/errors";


const app: Express = express();
app.use(express.json());
app.use('/api',rootRouter)
export const prismaClient = new PrismaClient({
    log:['query' , 'info' , 'warn' , 'error']
}).$extends({
    result:{
        address:{
            formattedAddress:{
                needs:{
                    lineOne:true,
                    lineTwo:true,
                    city:true,
                    country:true,
                    pincode:true
                },
                compute: (addr) => {
                    return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode}`
                }
            }
        }
    }
})

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("Running on port 3000");
});

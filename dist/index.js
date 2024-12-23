"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express = require("express");
const secrets_1 = require("./secrets");
const routes_1 = require("./routes");
const client_1 = require("@prisma/client");
const errors_1 = require("@middlewares/errors");
const app = express();
app.use(express.json());
app.use('/api', routes_1.default);
exports.prismaClient = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error']
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    city: true,
                    country: true,
                    pincode: true
                },
                compute: (addr) => {
                    return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode}`;
                }
            }
        }
    }
});
app.use(errors_1.errorMiddleware);
app.listen(secrets_1.PORT, () => {
    console.log("Running on port 3000");
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
const dotenv = require("dotenv");
//initialise
dotenv.config({ path: '.env' });
exports.PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;

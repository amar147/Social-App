"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_1 = require("./modules");
const middleware_1 = require("./middleware");
const db_connecttion_1 = require("./DB/db.connecttion");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_connecttion_1.connectDB)(app, config_1.PORT);
app.all('/', async (req, res) => {
    return res.status(200).json("Welcome In BackEnd API");
});
app.use('/auth', modules_1.authController);
app.use(middleware_1.globalErrorHandle);

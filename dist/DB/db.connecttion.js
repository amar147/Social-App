"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const cache_service_1 = require("../common/services/cache.service");
const connectDB = async (app, port) => {
    try {
        await mongoose_1.default.connect(config_1.DB_URI);
        console.log("Database connected successfully");
        await cache_service_1.cacheService.connectRedis();
        app.listen(port, () => { console.log(`Server is running on port ${port}`); });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
exports.connectDB = connectDB;

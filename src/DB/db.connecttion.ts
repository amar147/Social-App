import mongoose from "mongoose";
import { DB_URI } from "../config";
import type {Application} from 'express';
import { cacheService } from "../common/services/cache.service";




export const connectDB = async (app: Application, port: number) => {
    try {
        await mongoose.connect(DB_URI);
        await cacheService.connectRedis();

        app.listen(port, () => {console.log(`Server is running on port ${port}`)});

    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
    }
}

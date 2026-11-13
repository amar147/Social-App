import type { Response, Request, NextFunction } from 'express';
import { IError } from '../common/interface/index.js';
import { cleanupUploadedFiles } from '../common/utils/multer/index.js';

export const globalErrorHandle = async (
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    await cleanupUploadedFiles(req);

    return res.status(error.status ?? 500).json({
        error_message: error.message || 'server error',
        error,
        cause: error.cause,
        stack: error.stack,
    });
};
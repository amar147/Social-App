"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandle = void 0;
const globalErrorHandle = (error, req, res, next) => {
    return res.status(error.status ?? 500).json({
        error_message: error.message || 'server error',
        error,
        cause: error.cause,
        stack: error.stack
    });
};
exports.globalErrorHandle = globalErrorHandle;

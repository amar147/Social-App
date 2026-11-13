"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandle = void 0;
const index_js_1 = require("../common/utils/multer/index.js");
const globalErrorHandle = async (error, req, res, next) => {
    await (0, index_js_1.cleanupUploadedFiles)(req);
    return res.status(error.status ?? 500).json({
        error_message: error.message || 'server error',
        error,
        cause: error.cause,
        stack: error.stack,
    });
};
exports.globalErrorHandle = globalErrorHandle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatter = void 0;
const ResponseFormatter = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            if (res.headersSent)
                return;
            res.status(result?.status ?? 200).json({
                success: true,
                message: result?.message ?? "Success",
                data: result?.data ?? result,
                meta: result?.meta
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.ResponseFormatter = ResponseFormatter;

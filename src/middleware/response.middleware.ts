import { NextFunction, Request, Response, RequestHandler } from "express";

export const ResponseFormatter = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any> | any
): RequestHandler => {
  return async (
    req: Request,
    res: Response, 
    next: NextFunction): Promise<void> => {
    try {
        const result = await handler(req, res, next);
        if (res.headersSent) return
        res.status(result?.status ?? 200).json({
        success: true,
        message: result?.message ?? "Success",
        data: result?.data ?? result,
        meta:result?.meta
    });
    } catch (error) {
        next(error);
    }
  };
};


// SEARCH 3LYHA 
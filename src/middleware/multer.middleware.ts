import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BadRequestException } from '../common/exceptions/index.js';
import {
    processFile,
    processArray,
    cleanupUploadedFiles,
} from '../common/utils/multer/index.js';

export interface LocalMulterMiddlewareOptions {
    multerMiddleware: RequestHandler;
    validation?: readonly string[];
    customPath?: string;
    isRequired?: boolean;
}

export const localMulterMiddleware = ({
    multerMiddleware,
    validation = [],
    customPath = 'general',
    isRequired = false,
}: LocalMulterMiddlewareOptions): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        multerMiddleware(req, res, async (error: unknown) => {
            if (error) {
                return next(error);
            }

            try {
                const hasSingleFile = Boolean(req.file);
                const hasArrayFiles = Array.isArray(req.files) && req.files.length > 0;
                const hasFieldFiles =
                    Boolean(req.files) &&
                    !Array.isArray(req.files) &&
                    typeof req.files === 'object' &&
                    Object.keys(req.files).length > 0;

                if (isRequired && !hasSingleFile && !hasArrayFiles && !hasFieldFiles) {
                    return next(new BadRequestException('File upload is required'));
                }

                // حالة رفع ملف واحد: upload.single('image')
                if (req.file) {
                    req.file.path = await processFile({
                        customPath,
                        validation,
                        file: req.file,
                    });
                }

                // حالة رفع مجموعة ملفات في نفس الحقل: upload.array('images')
                if (hasArrayFiles) {
                    const filesArray = req.files as Express.Multer.File[];
                    await processArray({
                        customPath,
                        validation,
                        files: filesArray,
                    });
                }
                // حالة رفع ملفات من حقول مختلفة: upload.fields([{ name: 'avatar' }, { name: 'cover' }])
                else if (hasFieldFiles) {
                    const filesRecord = req.files as Record<string, Express.Multer.File[]>;
                    for (const fieldFiles of Object.values(filesRecord)) {
                        await processArray({
                            customPath,
                            validation,
                            files: fieldFiles,
                        });
                    }
                }

                next();
            } catch (err) {
                // لو ملف اترفع واللي بعده فشل، يمسح اللي اترفعوا قبل ما يبعت الإيرور
                await cleanupUploadedFiles(req);
                next(err);
            }
        });
    };
};
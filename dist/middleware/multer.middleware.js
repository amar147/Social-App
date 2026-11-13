"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localMulterMiddleware = void 0;
const index_js_1 = require("../common/exceptions/index.js");
const index_js_2 = require("../common/utils/multer/index.js");
const localMulterMiddleware = ({ multerMiddleware, validation = [], customPath = 'general', isRequired = false, }) => {
    return (req, res, next) => {
        multerMiddleware(req, res, async (error) => {
            if (error) {
                return next(error);
            }
            try {
                const hasSingleFile = Boolean(req.file);
                const hasArrayFiles = Array.isArray(req.files) && req.files.length > 0;
                const hasFieldFiles = Boolean(req.files) &&
                    !Array.isArray(req.files) &&
                    typeof req.files === 'object' &&
                    Object.keys(req.files).length > 0;
                if (isRequired && !hasSingleFile && !hasArrayFiles && !hasFieldFiles) {
                    return next(new index_js_1.BadRequestException('File upload is required'));
                }
                if (req.file) {
                    req.file.path = await (0, index_js_2.processFile)({
                        customPath,
                        validation,
                        file: req.file,
                    });
                }
                if (hasArrayFiles) {
                    const filesArray = req.files;
                    await (0, index_js_2.processArray)({
                        customPath,
                        validation,
                        files: filesArray,
                    });
                }
                else if (hasFieldFiles) {
                    const filesRecord = req.files;
                    for (const fieldFiles of Object.values(filesRecord)) {
                        await (0, index_js_2.processArray)({
                            customPath,
                            validation,
                            files: fieldFiles,
                        });
                    }
                }
                next();
            }
            catch (err) {
                await (0, index_js_2.cleanupUploadedFiles)(req);
                next(err);
            }
        });
    };
};
exports.localMulterMiddleware = localMulterMiddleware;

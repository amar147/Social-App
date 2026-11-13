"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupUploadedFiles = exports.deleteLocalFile = exports.processArray = exports.processFile = exports.localFileUpload = exports.fileValidation = void 0;
const multer_1 = __importDefault(require("multer"));
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const file_type_1 = require("file-type");
const index_js_1 = require("../../exceptions/index.js");
exports.fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    files: ['application/json', 'application/pdf'],
};
const localFileUpload = ({ fileSize = 5 } = {}) => {
    const storage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: fileSize * 1024 * 1024 },
    });
};
exports.localFileUpload = localFileUpload;
const processFile = async ({ customPath = 'general', validation = [], file, }) => {
    const result = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
    if (!result || !validation.includes(result.mime)) {
        throw new index_js_1.BadRequestException('Invalid file format');
    }
    const relativeFolderPath = (0, node_path_1.join)('uploads', customPath);
    const absoluteFolderPath = (0, node_path_1.resolve)(process.cwd(), relativeFolderPath);
    await (0, promises_1.mkdir)(absoluteFolderPath, { recursive: true });
    const fileName = `${(0, node_crypto_1.randomUUID)()}.${result.ext}`;
    const absoluteFilePath = (0, node_path_1.join)(absoluteFolderPath, fileName);
    await (0, promises_1.writeFile)(absoluteFilePath, file.buffer);
    return `/${relativeFolderPath.replace(/\\/g, '/')}/${fileName}`;
};
exports.processFile = processFile;
const processArray = async ({ customPath = 'general', validation = [], files, }) => {
    return Promise.all(files.map(async (file) => {
        const path = await (0, exports.processFile)({ customPath, validation, file });
        file.path = path;
        return path;
    }));
};
exports.processArray = processArray;
const deleteLocalFile = async (relativePath) => {
    if (!relativePath)
        return;
    try {
        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        const absolutePath = (0, node_path_1.resolve)(process.cwd(), cleanPath);
        await (0, promises_1.unlink)(absolutePath);
    }
    catch {
    }
};
exports.deleteLocalFile = deleteLocalFile;
const cleanupUploadedFiles = async (req) => {
    if (req.file?.path) {
        await (0, exports.deleteLocalFile)(req.file.path);
    }
    if (Array.isArray(req.files)) {
        await Promise.all(req.files.map((file) => (0, exports.deleteLocalFile)(file.path)));
    }
    else if (req.files && typeof req.files === 'object') {
        const allFiles = Object.values(req.files).flat();
        await Promise.all(allFiles.map((file) => (0, exports.deleteLocalFile)(file.path)));
    }
};
exports.cleanupUploadedFiles = cleanupUploadedFiles;

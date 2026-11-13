import multer, { Multer } from 'multer';
import { randomUUID } from 'node:crypto';
import { writeFile, mkdir, unlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { Request } from 'express';
import { fileTypeFromBuffer } from 'file-type';
import { BadRequestException } from '../../exceptions/index.js';

export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    files: ['application/json', 'application/pdf'],
} as const;

interface LocalUploadOptions {
    fileSize?: number; // بالميجابايت
}

interface ProcessFileOptions {
    customPath?: string;
    validation?: readonly string[];
    file: Express.Multer.File;
}

interface ProcessArrayOptions {
    customPath?: string;
    validation?: readonly string[];
    files: Express.Multer.File[];
}

export const localFileUpload = ({ fileSize = 5 }: LocalUploadOptions = {}): Multer => {
    const storage = multer.memoryStorage();
    return multer({
        storage,
        limits: { fileSize: fileSize * 1024 * 1024 },
    });
};

export const processFile = async ({
    customPath = 'general',
    validation = [],
    file,
}: ProcessFileOptions): Promise<string> => {
    const result = await fileTypeFromBuffer(file.buffer);

    if (!result || !validation.includes(result.mime)) {
        throw new BadRequestException('Invalid file format');
    }

    const relativeFolderPath = join('uploads', customPath);
    const absoluteFolderPath = resolve(process.cwd(), relativeFolderPath);
    await mkdir(absoluteFolderPath, { recursive: true });

    const fileName = `${randomUUID()}.${result.ext}`;
    const absoluteFilePath = join(absoluteFolderPath, fileName);
    await writeFile(absoluteFilePath, file.buffer);

    return `/${relativeFolderPath.replace(/\\/g, '/')}/${fileName}`;
};

export const processArray = async ({
    customPath = 'general',
    validation = [],
    files,
}: ProcessArrayOptions): Promise<string[]> => {
    return Promise.all(
        files.map(async (file) => {
            const path = await processFile({ customPath, validation, file });
            file.path = path;
            return path;
        })
    );
};

// دالة لمسح ملف واحد من الهارد بأمان
export const deleteLocalFile = async (relativePath?: string): Promise<void> => {
    if (!relativePath) return;
    try {
        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        const absolutePath = resolve(process.cwd(), cleanPath);
        await unlink(absolutePath);
    } catch {
        // تجاهل الإيرور لو الملف مش موجود أصلاً
    }
};

// دالة شاملة بتمسح أي ملفات اترفعت في الريكويست (single أو array أو fields)
export const cleanupUploadedFiles = async (req: Request): Promise<void> => {
    if (req.file?.path) {
        await deleteLocalFile(req.file.path);
    }

    if (Array.isArray(req.files)) {
        await Promise.all(req.files.map((file) => deleteLocalFile(file.path)));
    } else if (req.files && typeof req.files === 'object') {
        const allFiles = Object.values(req.files).flat();
        await Promise.all(allFiles.map((file) => deleteLocalFile(file.path)));
    }
};
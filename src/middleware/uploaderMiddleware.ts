/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
};

export default multer({
    storage,
    fileFilter,
    limits: { fileSize: 100000000, files: 10 },
});

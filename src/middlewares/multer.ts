import multer from "multer";
import path from 'path'
import crypto from 'crypto'

let dir;

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            dir = path.resolve(__dirname, '..', '..', 'public');
            cb(null, dir);
        },
        filename: (req, file: any, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                //@ts-ignore
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        },
    }),
};

export const multerMiddleware = {
    storage: storageTypes.local,
    dest: dir,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        // cb = callback
        const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'application/pdf'];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
};



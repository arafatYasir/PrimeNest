import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeType = "image";

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith(allowedMimeType)) {
            const error = new Error("Only image files are allowed");
            error.statusCode = 400;

            return cb(error, false);
        }

        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

export default upload;
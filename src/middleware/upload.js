const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "src", "public", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

const resizeImages = async (req, res, next) => {
    if (req.file && !req.files) {
        req.files = [req.file];
    }
    if (!req.files || req.files.length === 0) {
        return next();
    }
    const uploadsPath = path.join(process.cwd(), "src", "public", "uploads");
    const maxWidth = 1200;
    const maxHeight = 1200;
    const quality = 85;
    const maxFileSize = 500 * 1024;
    try {
        for (const file of req.files) {
            const filePath = path.join(uploadsPath, file.filename);
            if (!fs.existsSync(filePath)) { continue; }
            const metadata = await sharp(filePath).metadata();
            const originalSize = fs.statSync(filePath).size;
            const fileExt = path.extname(file.filename).toLowerCase();
            const isJpeg = ['.jpg', '.jpeg'].includes(fileExt);
            const isPng = fileExt === '.png';
            const isWebp = fileExt === '.webp';
            let needsResize = metadata.width > maxWidth || metadata.height > maxHeight;
            let needsOptimize = originalSize > maxFileSize;
            if (needsResize || needsOptimize) {
                let sharpInstance = sharp(filePath);
                if (needsResize) {
                    sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
                        fit: 'inside', withoutEnlargement: true
                    });
                }
                if (isJpeg) {
                    sharpInstance = sharpInstance.jpeg({ quality: quality, mozjpeg: true });
                } else if (isPng) {
                    sharpInstance = sharpInstance.png({ quality: quality, compressionLevel: 9, adaptiveFiltering: true });
                } else if (isWebp) {
                    sharpInstance = sharpInstance.webp({ quality: quality });
                } else {
                    sharpInstance = sharpInstance.jpeg({ quality: quality, mozjpeg: true });
                    const newFilename = file.filename.replace(/\.[^.]+$/, '.jpg');
                    file.filename = newFilename;
                    const newFilePath = path.join(uploadsPath, newFilename);
                    await sharpInstance.toFile(newFilePath);
                    if (filePath !== newFilePath) { fs.unlinkSync(filePath); }
                    const newStats = fs.statSync(newFilePath);
                    file.size = newStats.size;
                    continue;
                }
                await sharpInstance.toFile(filePath + '.tmp');
                fs.renameSync(filePath + '.tmp', filePath);
                const newStats = fs.statSync(filePath);
                file.size = newStats.size;
                console.log(`Image optimized: ${file.filename} - ${(originalSize / 1024).toFixed(2)}KB -> ${(file.size / 1024).toFixed(2)}KB`);
            }
        }
    } catch (error) {
        console.error('Error resizing images:', error);
    }
    next();
};

module.exports = upload;
module.exports.resizeImages = resizeImages;
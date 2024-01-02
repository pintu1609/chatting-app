const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config()
// require("config")


const {
    GridFsStorage
} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.DB_DATABASE,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `${new Date().getTime()}_${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: process.env.DB_BUCKET
            };
            resolve(fileInfo);
        });
    }
});

exports.upload = multer({
    storage
});
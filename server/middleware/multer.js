const multer = require('multer');
const multers3 = require('multer-s3');
const s3 = require('../config/s3client');
const { AWS_BUCKET_NAME } = require('../config');

const upload = multer({
    storage: multers3({
        s3,
        bucket: AWS_BUCKET_NAME,
        key: (req, file, cb)=>{
            cb(null, `profile-images/${Date.now()}-${file.originalname}`);
        },
        contentType: multers3.AUTO_CONTENT_TYPE 
    })
});

module.exports = upload;
const { S3Client, S3 } = require("@aws-sdk/client-s3");
const { AWS_REGION_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require(".");

const s3 = new S3Client({
    region: AWS_REGION_NAME,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }

});

module.exports = s3;
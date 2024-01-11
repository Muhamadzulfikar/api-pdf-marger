const AWS = require('aws-sdk');
require('dotenv').config();

// configure AWS S3 bucket
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  s3ForcePathStyle: true,
  sslEnabled: false,
});

// create S3 Bucket
const s3 = new AWS.S3();

module.exports = s3;

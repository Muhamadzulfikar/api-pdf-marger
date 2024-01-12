const fs = require('fs');
const s3 = require('../../Libs/Aws');
const ErrorHandling = require('../Error/ErrorHandling');

module.exports = {
  // eslint-disable-next-line consistent-return
  async uploadToS3FromRequest(files) {
    try {
      const uploadPromises = files.map((file) => {
        const fileName = file.originalname.replace(/ /g, '-');
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `folder/${fileName}`,
          Body: fs.createReadStream(file.path),
        };

        return new Promise((resolve) => {
          s3.upload(params, (err, data) => {
            if (err) {
              throw err;
            } else {
              fs.unlinkSync(file.path);
              resolve([
                data.Key,
                data.Location,
              ]);
            }
          });
        });
      });

      const urls = await Promise.all(uploadPromises);

      return urls;
    } catch (error) {
      ErrorHandling.internalError(error.message);
    }
  },

  async uploadToS3(pdfPath, localFilePaths, name) {
    const fileName = name.replace(/ /g, '-');
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `merge-pdf/${fileName}.pdf`,
      Body: fs.readFileSync(pdfPath),
    };

    return new Promise((resolve) => {
      s3.upload(params, (err, data) => {
        if (err) {
          throw err;
        } else {
          localFilePaths.forEach((path) => fs.unlinkSync(path));
          resolve(data.Key);
        }
      });
    });
  },

  // eslint-disable-next-line consistent-return
  async downloadFromS3(key) {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `merge-pdf/${key}`,
      };

      return new Promise((resolve) => {
        s3.getObject(params, (err, data) => {
          if (err) {
            throw err;
          } else {
            const localFilePath = './downloads/result.pdf';
            fs.writeFileSync(localFilePath, data.Body);
            resolve(localFilePath);
          }
        });
      });
    } catch (error) {
      ErrorHandling.internalError(error.message);
    }
  },
};

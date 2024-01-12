const merge = require('easy-pdf-merge');
const fs = require('fs');
const PdfService = require('../Service/PdfService');

require('dotenv').config();

module.exports = {
  async upload(req, res) {
    try {
      const { files } = req;
      const { name } = req.body;
      const filePath = files.map((file) => file.path);

      const mergedPdfPath = './downloads/output.pdf';
      merge(filePath, mergedPdfPath, (async (err) => {
        if (err) {
          throw err;
        } else {
          const pdfPath = await PdfService.uploadToS3(mergedPdfPath, filePath, name);
          fs.unlinkSync(mergedPdfPath);
          res.status(201).json({
            message: 'Success',
            data: pdfPath.split('/')[1],
          });
        }
      }));
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        data: error.message,
      });
    }
  },

  async download(req, res) {
    try {
      const { path } = req.params;
      const file = await PdfService.downloadFromS3(path);
      res.download(file, path, (err) => {
        if (err) {
          throw err;
        }

        fs.unlinkSync(file);
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        data: error.message,
      });
    }
  },
};

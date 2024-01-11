const merge = require('easy-pdf-merge');
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
          const testing = await PdfService.uploadToS3(mergedPdfPath, filePath, name);
          res.status(200).json({
            message: 'Success',
            data: testing,
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
};

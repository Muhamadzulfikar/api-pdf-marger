const ErrorHandling = require('../Error/ErrorHandling');
const ResponseError = require('../Error/ResponseError');

module.exports = {
  minFileUpload(req, res, next) {
    try {
      const { files } = req;
      if (files.length < 2) ErrorHandling.badRequest('Minimal 2 files yang diupload');

      next();
    } catch (error) {
      if (error.code) {
        ResponseError(res, error);
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
          data: error.message,
        });
      }
    }
  },
};

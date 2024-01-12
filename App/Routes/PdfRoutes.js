const express = require('express');
const multer = require('multer');
const PdfController = require('../Controller/PdfController');
const PdfMiddleware = require('../Middleware/PdfMiddleware');

const route = express.Router();
const upload = multer({ dest: 'uploads/' });

route.post('/uploads/pdf', PdfMiddleware.minFileUpload, upload.array('files', 5), PdfController.upload);
route.get('/download/pdf/:path', PdfController.download);

module.exports = route;

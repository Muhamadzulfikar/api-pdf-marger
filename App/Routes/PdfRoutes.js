const express = require('express');
const multer = require('multer');
const PdfController = require('../Controller/PdfController');

const route = express.Router();
const upload = multer({ dest: 'uploads/' });

route.post('/uploads/pdf', upload.array('files', 5), PdfController.upload);

module.exports = route;

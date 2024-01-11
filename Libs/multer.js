const multer = require('multer');

const storage = multer.memoryStorage();
const uploadToMemory = multer({ storage }).array('files', 5);

module.exports = uploadToMemory;

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PdfRoutes = require('./App/Routes/PdfRoutes');

const port = process.env.PORT || process.env.HOSTPORT;
const app = express();

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.use('/v1', PdfRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'successfully',
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

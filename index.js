const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const AssetController = require('./controllers/asset-controller');

const app = express();

app.use(bodyParser());

app.post('/upload', upload.any(), AssetController.upload);

app.listen(3000, () => {
  console.log('Application started');
});

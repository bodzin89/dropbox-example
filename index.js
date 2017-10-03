const express = require('express');
const bodyParser = require('body-parser');
const fileStream = require('./middlewares/file-stream');

const AssetController = require('./controllers/asset-controller');

const app = express();

app.use(bodyParser());

app.post('/upload', fileStream, AssetController.upload);

app.listen(3000, () => {
  console.log('Application started');
});

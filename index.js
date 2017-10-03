const express = require('express');
const bodyParser = require('body-parser');
const streamBuilder = require('./middlewares/stream-builder');

const AssetController = require('./controllers/asset-controller');

const app = express();

app.use(bodyParser());

app.post('/upload', streamBuilder, AssetController.upload);

app.listen(3000, () => {
  console.log('Application started');
});

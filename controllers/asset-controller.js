const request = require('request');
const uploadService = require('../service/upload-service');
const path = require('path');
const url = require('url');

class AssetController {
  static upload(req, res) {
    const { file } = req.body;

    const filename = path.basename(
      file ? file.filename : url.parse(file).pathname
    );

    const stream = file.stream ? file.stream : request.get(file);

    return uploadService(filename, stream, file.size)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  }
}

module.exports = AssetController;

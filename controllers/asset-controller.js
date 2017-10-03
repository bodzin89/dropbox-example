const request = require('request');
const uploadService = require('../service/upload-service');
const path = require('path');
const url = require('url');

class AssetController {
  static upload(req, res) {
    const filename = path.basename(
      req.files[0]
        ? req.files[0].originalname
        : url.parse(req.body.file).pathname
    );

    const stream = req.files[0] ? req : request.get(req.body.file);

    return uploadService(filename, stream)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  }
}

module.exports = AssetController;

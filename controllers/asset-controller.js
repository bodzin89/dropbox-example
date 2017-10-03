const uploadService = require('../service/upload-service');

class AssetController {
  static upload(req, res) {
    const { file } = req.body;

    return uploadService(file)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  }
}

module.exports = AssetController;

const Busboy = require('busboy');
const request = require('request');
const path = require('path');
const url = require('url');

module.exports = function(req, res, next) {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', (fieldname, file, filename) => {
    req.body.file = {
      filename,
      stream: file,
      size: parseInt(req.headers['content-length'])
    };

    next();
  });

  busboy.on('field', (field, link) => {
    request.get(link).once('response', info => {
      const filename = path.basename(url.parse(link).pathname);

      req.body.file = {
        filename,
        stream: request.get(link),
        size: parseInt(info.headers['content-length'])
      };

      next();
    });
  });

  req.pipe(busboy);
};

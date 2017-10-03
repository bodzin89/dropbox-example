const Busboy = require('busboy');
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

  req.pipe(busboy);
};

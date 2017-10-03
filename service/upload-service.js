const uploadToS3 = require('./s3');
const uploadToDropbox = require('./dropbox');

module.exports = function upload(file) {
  switch (file.dest) {
    case 's3':
      return uploadToS3(file);
    case 'dropbox':
      return uploadToDropbox(file);
  }
};

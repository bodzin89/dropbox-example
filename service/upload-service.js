const db = require('dropbox-stream');
const config = require('../config');

module.exports = function upload(filename, stream) {
  return new Promise((resolve, reject) => {
    const upload = db
      .createDropboxUploadStream({
        token: config.accessToken,
        filepath: `/test/${filename}`,
        chunkSize: 1000 * 1024,
        autorename: true
      })
      .on('done', res => {
        console.log(
          `File was uploaded: \nname: ${res.name};\npath:${res.path_lower}`
        );
        return resolve({
          statusCode: 201,
          statusMessage: 'OK',
          data: { name: res.name }
        });
      })
      .on('error', err => {
        console.error(`There was an error while uploading: ${err.message}`);
        return reject(err);
      });

    stream
      .on('error', err => {
        console.error(`There was an error while uploading: ${err.message}`);
        return reject({
          statusCode: 404,
          statusMessage: 'NOT FOUND'
        });
      })
      .pipe(upload);
  });
};

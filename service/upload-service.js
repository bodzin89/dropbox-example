const dropbox = require('dropbox-stream');
const config = require('../config');

module.exports = function upload(filename, stream, size) {
  return new Promise((resolve, reject) => {
    const opt = {
      token: config.accessToken,
      filepath: `/test/${filename}`,
      chunkSize: 10 * 1000 * 1024,
      autorename: true
    };

    const upload = dropbox
      .createDropboxUploadStream(opt)
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
      .on('progress', r => {
        console.log(`progress ${Math.ceil(r / size * 1000) / 10}%`);
        return resolve({
          statusCode: 200,
          statusMessage: 'OK'
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

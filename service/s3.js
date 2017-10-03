const AWS = require('aws-sdk');

module.exports = function uploadToS3({ filename, stream, size }) {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      accessKeyId: 'ACCESS_KEY',
      secretAccessKey: 'SECRET_KEY'
    });

    const params = {
      Bucket: 'ps-content-development',
      Key: `test/s3-upload/bodzin89/${filename}`,
      Body: stream
    };

    const options = { partSize: 10 * 1024 * 1024 };

    const upload = s3.upload(params, options);

    upload.on('httpUploadProgress', ({ loaded }) => {
      console.log(`progress ${Math.ceil(loaded / size * 1000) / 10}%`);
      return resolve({
        statusCode: 201,
        statusMessage: 'OK'
      });
    });

    upload.send((err, res) => {
      console.log(
        `File was uploaded:\nname: ${res.Key};\npath:${res.Location}`
      );
    });
  });
};

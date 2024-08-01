const { bucket } = require('./config');


const UploadImage = (req, res, next) => {
    if (!req.files) return next();
  
    const files = req.files;
    const uploadedFiles = {};
  
    const uploadPromises = Object.keys(files).map((fieldName) => {
      const file = files[fieldName][0];
      const nomeArquivo = Date.now() + '.' + file.originalname.split('.').pop();
      const bucketFile = bucket.file(nomeArquivo);
      const stream = bucketFile.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      return new Promise((resolve, reject) => {
        stream.on('error', (error) => {
          reject(error);
        });
  
        stream.on('finish', async () => {
          await bucketFile.makePublic();
  
          const firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
          uploadedFiles[fieldName] = firebaseUrl;
  
          resolve();
        });
  
        stream.end(file.buffer);
      });
    });
  
    Promise.all(uploadPromises)
      .then(() => {
        req.uploadedFiles = uploadedFiles;
        next();
      })
      .catch((error) => {
        console.error(error);
        next();
      });
  };
  
module.exports = UploadImage;
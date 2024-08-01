const admin = require('firebase-admin');

var serviceAccount = require("../firebase-key.json");

const BUCKET ="imagestor-768b5.appspot.com"



const uploadImage = async (file, folder) => {
  const bucket = admin.storage().bucket();

  const fileName = `${folder}/${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', error => {
      reject(error);
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};


module.exports = uploadImage;
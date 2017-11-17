'use strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')();
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// let conditions = function() {
//   return !event.data.contentType.startsWith('image/') || metadata.isOptimized || event.data.resourceState === 'not_exists';
// }

let resizeImage = function(target, size, dist) {
  if ( typeof target === 'undefined' || typeof size === 'undefined' ) return;
  const params = [
    target,
    '-resize', size,
    '-background', 'white', '-flatten', '-alpha', 'off',
    '-strip', '-interlace', 'Plane',
    '-quality', '80%',
    ( typeof dist === 'undefined' )? target: dist
  ];
  console.log(target, size, params);
  return spawn('convert', params);
};

let getImageSize = function(file) {
  return file.startsWith('orig') && '1280x1024>' ||
          file.startsWith('medium') && '640x480>' ||
            file.startsWith('small') && '320x240>'
}


exports.generateThumbnail = functions.storage.object().onChange( event => {
  const filePath = event.data.name;
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const resultFilePath = path.normalize(path.join(fileDir, fileName));

  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), resultFilePath);
  const metadata = event.data.metadata;

  const bucket = gcs.bucket(event.data.bucket);
  const file = bucket.file(filePath);

  if (!event.data.contentType.startsWith('image/')) {
    return;
  }

  if (metadata.isOptimized) {
    return;
  }

  if (event.data.resourceState === 'not_exists') {
    return;
  }

  return mkdirp(tempLocalDir)
    .then( () => file.download({ destination: tempLocalFile }) )
    .then( () => resizeImage(tempLocalFile, getImageSize(fileName)) )
    .then( () => {
      metadata.isOptimized = true;
      return bucket.upload(tempLocalFile, { destination: resultFilePath, metadata: { metadata } });
    })
    .then( () => fs.unlinkSync(tempLocalFile) )
});
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
const logoPath = 'assets/watermark.png';

let maxWidth = 1280;
let maxHeight = 1024;

exports.generateThumbnail = functions.storage.object().onChange(event => {
  const filePath = event.data.name;
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const resultFilePath = path.normalize(path.join(fileDir, fileName));

  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLogoPath = path.join(os.tmpdir(), path.basename(logoPath));
  const tempLocalThumbFile = path.join(os.tmpdir(), resultFilePath);
  const metadata = event.data.metadata;

  if (!event.data.contentType.startsWith('image/')) {
    return;
  }

  if (metadata.isOptimized) {
    return;
  }

  if (event.data.resourceState === 'not_exists') {
    return;
  }

  if (fileName.startsWith('orig')) {
  	maxWidth = 1280; maxHeight = 1024;
	}

  if (fileName.startsWith('small')) {
  	maxWidth = 320; maxHeight = 240;
	}

	if (fileName.startsWith('medium')) {
  	maxWidth = 640; maxHeight = 480;
	}

  const bucket = gcs.bucket(event.data.bucket);
  const file = bucket.file(filePath);
  const logo = bucket.file(logoPath);
  const thumbFile = bucket.file(resultFilePath);

  return mkdirp(tempLocalDir).then(() => {
    return file.download({destination: tempLocalFile});
  }).then(() => {
    if ( fs.existsSync(tempLogoPath) ) return;
    console.log('Downloading to: ', tempLogoPath);
    return logo.download({destination: tempLogoPath});
  }).catch((err) => {
    console.error('Failed to download file.', err);
  }).then(() => {
    // return spawn('convert', [tempLocalFile,
    // 	'-resize', `${maxWidth}x${maxHeight}>`,
    // 	'-background', 'white', '-flatten', '-alpha', 'off',
    // 	'-strip', '-interlace', 'Plane',
    // 	'-quality', '80%',
    // 	tempLocalFile]);
    return spawn('convert', [tempLocalFile,
      '-resize', `${maxWidth}x${maxHeight}>`,
      '-quality', '75%',
      tempLocalFile]);
  }).then( () => {
    if ( fileName.startsWith('small') ) return;
    console.log(`Start watermarking...`);
  	return spawn('composite', ['-dissolve', '10',
  		'-tile', tempLogoPath, tempLocalFile, tempLocalFile]);
  }).then(() => {
  	metadata.isOptimized = true;
    return bucket.upload(tempLocalFile, { destination: resultFilePath, metadata: { metadata } });
  }).then(() => {
    fs.unlinkSync(tempLocalFile);
  })
});
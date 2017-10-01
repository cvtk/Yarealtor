/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
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

let maxWidth = 1280;
let maxHeight = 1024;



exports.generateThumbnail = functions.storage.object().onChange(event => {
  const filePath = event.data.name;
  console.log(filePath)
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const resultFilePath = path.normalize(path.join(fileDir, fileName));

  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
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
  const thumbFile = bucket.file(resultFilePath);

  return mkdirp(tempLocalDir).then(() => {
    return file.download({destination: tempLocalFile});
  }).then(() => {
    return spawn('convert', [tempLocalFile,
    	'-resize', `${maxWidth}x${maxHeight}>`,
    	'-background', 'white', '-flatten', '-alpha', 'off',
    	'-strip', '-interlace', 'Plane',
    	'-quality', '80%',
    	tempLocalThumbFile]);
  // }).then( () => {
  // 	return spawn('composite', ['-dissolve', '50%',
  // 		'-gravity', 'center', tempLocalThumbFile,
  // 		'/assets/logo.jpg', tempLocalThumbFile]);
  }).then(() => {
  	metadata.isOptimized = true;
    return bucket.upload(tempLocalThumbFile, { destination: resultFilePath, metadata: { metadata } });
  }).then(() => {
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);
    const config = {
      action: 'read',
      expires: '03-01-2500'
    };
    return Promise.all([
      thumbFile.getSignedUrl(config),
      file.getSignedUrl(config)
    ]);
  })
});
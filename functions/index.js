// require('@google-cloud/debug-agent').start();
// var functions = require('firebase-functions');
// exports.imgOptimizer = require("./fireImgOptimizer")();

var sampleConfig = {
imagePath:"/images",
sizes:{w:80,h:80},
naming:{postfix:"_80x80",prefix:"thumb_"}
};
exports.imgOptimizer = require("./fireImgOptimizer")(sampleConfig);

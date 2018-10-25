var path = require('path');
var http = require('http');
var AWS = require('aws-sdk');

AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

var modifyUrl = function(url) {
  var urlComponents = url.split('/')
  var filename = [new Date().getTime().toString(), urlComponents.pop()].join('-');
  urlComponents.push(filename);
  url = urlComponents.join('/');
  return url.slice(1, url.length);
}

var server = http.createServer(function (req, res) {
  var s3obj = new AWS.S3({
    params: {
      Bucket: process.env.AWS_BUCKET,
      Key: modifyUrl(req.url)
    }
  });

  s3obj.upload({Body: req})
    .on('httpUploadProgress', function(evt) { console.log(evt); })
    .send(function(err, data) { console.log(err, data) });

  req.on('end', function() {
    res.write('{"success": true}');
    res.end();
  })
});
server.listen(process.env.PORT, '0.0.0.0');

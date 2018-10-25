var path = require('path');
var http = require('http');
var AWS = require('aws-sdk');

var verbose = true;

AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

var modifyUrl = function(host, url) {
  var urlComponents = url.slice(1, url.length).split('/')
  var filename = [new Date().getTime().toString(), urlComponents.pop()].join('-');
  urlComponents.push(filename);
  if (process.env.INCLUDE_HOST) {
    urlComponents.unshift(host);
  }
  url = urlComponents.join('/');
  return url;
}

var parameterizeHost = function(host) {
  return host.split('.').join('-').split(':').join("-").replace('mimi-', '');
}

var setVerbose = function(req) {
  if (req.url == '/verbose') {
    if (verbose) {
      verbose = false;
    } else {
      verbose = true;
    }
  }
}

var server = http.createServer(function (req, res) {
  if (req.method == 'GET') {
    setVerbose(req);
    res.write('<html><head><title>秘密</title><meta charset="UTF-8"></head><body>秘密</body></html>');
    res.end();
  }
  if (req.method == 'POST') {
    var s3obj = new AWS.S3({
      params: {
        Bucket: process.env.AWS_BUCKET,
        Key: modifyUrl(parameterizeHost(req.headers.host), req.url)
      }
    });

    s3obj.upload({Body: req})
      .on('httpUploadProgress', function(evt) { 
        if (verbose) {
          console.log(evt); 
        }
      })
      .send(function(err, data) { 
        if (verbose) {
          console.log(err, data) 
        }
      });

    req.on('end', function() {
      res.write('{"success": true}');
      res.end();
    })
  }
});
server.listen(process.env.PORT, '0.0.0.0');

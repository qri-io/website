var AWS = require('aws-sdk')
	, path = require('path')
	, fs = require('fs')
	, s3 = new AWS.S3()
	, absDirPath = path.join(__dirname, '..', 'public');

function walk (dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

function contentType(fileName) {
	const components = fileName.split(".");
	if (!components.length) {
		return "text/plain"
	}
	const ext = components[components.length - 1];

	switch (ext) {
		case "html":
			return "text/html; charset=utf-8";
		case "css":
			return "text/css";
		case "js":
			return "application/javascript";
		case "png":
			return "image/png";
		case "jpg":
			return "image/jpeg";
		case "ico":
			return "image/x-icon";
		case "xml":
			return "application/xml";
		default:
			return "text/plain";
	}
}

walk(absDirPath, function(err, files){
	if (err != null) {
		throw err;
	}

	// remove abs path
	files = files.map(fn => fn.replace(absDirPath + "/", ''));

	var count = files.length;
	function done() { if (!--count) process.exit(); }
	// console.log(files);
	// process.exit();

	files.forEach(function(fileName) {
		fs.readFile(path.join(absDirPath, fileName), function (err, data) {
		  if (err) { throw err; }
		  const type = contentType(fileName)

			s3.putObject({
				Bucket: 'blog.qri.io',
				ContentType: type,
				Key:  fileName,
				ACL: 'public-read',
				Body: data
			}, function(err, resp){
				if (err) { throw err; }
				console.log("uploaded: %s, type: %s, eTag: %s", fileName, type, resp.ETag);
				done();
			});
		});
	});
});
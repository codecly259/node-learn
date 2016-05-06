/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * 理解node.js的事件轮询: http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
 * @returns {string}
 */

var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	var body = "<html>" +
		"<head>" +
		"<meta http-equiv='Content-Type' content='text/html;' charset='utf-8' />" +
		"</head>" +
		"<body>" +
		"<form action='/upload' enctype='multipart/form-data' method='post'>" +
		"<input type='file' name='upload'>" +
		"<input type='submit' value='Upload file'>" +
		"</form>" +
		"</body>" +
		"</html>";
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).text);
	response.end();
}

function show(response, postData) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;

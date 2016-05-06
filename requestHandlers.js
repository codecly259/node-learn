/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * 理解node.js的事件轮询: http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
 * @returns {string}
 */

var exec = require("child_process").exec;

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	var body = "<html>" +
		"<head>" +
		"<meta http-equiv='Content-Type' content='text/html;' charset='utf-8' />" +
		"</head>" +
		"<body>" +
		"<form action='/upload' method='post'>" +
		"<textarea name='text' rows='20' cols='60'></textarea>" +
		"<input type='submit' value='Submit text'>" +
		"</form>" +
		"</body>" +
		"</html>";
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.")
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + postData);
	response.end();
}

exports.start = start;
exports.upload = upload;

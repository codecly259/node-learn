/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * 理解node.js的事件轮询: http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
 * @returns {string}
 */

var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called.");

	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}

function upload(response) {
	console.log("Request handler 'upload' was called.")
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

exports.start = start;
exports.upload = upload;

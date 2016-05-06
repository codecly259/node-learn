/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * 理解node.js的事件轮询: http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
 * @returns {string}
 */

var exec = require("child_process").exec;

function start() {
	console.log("Request handler 'start' was called.");

	var content = "empty";
	exec("ls -lah", function (error, stdout, stderr) {
		content = stdout;
	});

	return content;
}

function upload() {
	console.log("Request handler 'upload' was called.")
	return "Hello Upload";
}

exports.start = start;
exports.upload = upload;

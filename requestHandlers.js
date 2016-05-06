/**
 * Created by maxinchun on 2016/5/6.
 */

function start() {
	console.log("Request handler 'start' was called.");
}

function upload() {
	console.log("Request handler 'upload' was called.")
}

exports.start = start;
exports.upload = upload;

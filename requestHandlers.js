/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * @returns {string}
 */
function start() {
	console.log("Request handler 'start' was called.");

	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		console.info(new Date().getTime() < startTime + milliSeconds);
		while(new Date().getTime() < startTime + milliSeconds);
	}

	sleep(10000);
	return "Hello Start";
}

function upload() {
	console.log("Request handler 'upload' was called.")
	return "Hello Upload";
}

exports.start = start;
exports.upload = upload;

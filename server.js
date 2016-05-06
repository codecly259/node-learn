/**
 * Created by maxinchun on 2016/5/6.
 *
 * 理解nodejs:Understanding node.js  http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb
 *
 * @type {exports|module.exports}
 */

var http = require("http");

function start() {
	function onRequest(request, response) {
		console.log("Request received.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World.");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;


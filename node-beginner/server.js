/**
 * Created by maxinchun on 2016/5/6.
 *
 * 理解nodejs:Understanding node.js  http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb
 *
 * @type {exports|module.exports}
 */

var formidable = require("formidable");
var http = require("http");
var url = require("url");

function start(route, handler) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handler, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;


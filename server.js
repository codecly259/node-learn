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
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function (postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk " + postDataChunk + ".");
		});

		request.addListener("end", function () {
			route(handler, pathname, response, postData);
		});


	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;


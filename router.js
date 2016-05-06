/**
 * Created by maxinchun on 2016/5/6.
 */

function route(handler, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handler[pathname] === 'function') {
		return handler[pathname](response, request);
	}else{
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;

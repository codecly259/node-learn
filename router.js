/**
 * Created by maxinchun on 2016/5/6.
 */

function route(handler, pathname) {
	console.log("About to route a request for " + pathname);
	if (typeof handler[pathname] === 'function') {
		return handler[pathname]();
	}else{
		console.log("No request handler found for " + pathname);
		return "404 Not found";
	}
}

exports.route = route;

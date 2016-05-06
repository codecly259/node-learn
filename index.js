/**
 * Created by maxinchun on 2016/5/6.
 */

var server = require("./server");
var router = require("./router");

server.start(router.route);


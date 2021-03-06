/**
 * Created by maxinchun on 2016/5/6.
 */

/**
 * node中程序是单线程执行的，通过事件轮询来实现并行操作
 * 理解node.js的事件轮询: http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
 * @returns {string}
 */

var fs = require("fs");
var formidable = require("formidable");
var util = require("util");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = "<html>" +
        "<head>" +
        "<meta http-equiv='Content-Type' content='text/html;' charset='utf-8' />" +
        "</head>" +
        "<body>" +
        "<form action='/upload' enctype='multipart/form-data' method='post'>" +
        "<input type='file' name='upload'>" +
        "<input type='submit' value='Upload file'>" +
        "</form>" +
        "</body>" +
        "</html>";
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to prase");

    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        //fs.renameSync(files.upload.path, "./tmp/test.png");

        var readStream = fs.createReadStream(files.upload.path);
        var writeStream = fs.createWriteStream("./tmp/test.png");
        //util.pump(readStream, writeStream, function(){
        //	fs.unlinkSync(files.upload.path);
        //});
        readStream.pipe(writeStream);
        readStream.on("end", function () {
            fs.unlinkSync(files.upload.path);
        })

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show'>");
        response.end();
    });
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

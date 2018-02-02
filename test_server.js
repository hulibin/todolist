var conf   = {
    server:{
        //监听端口
        "port":9090,

        //路径
        "path":'./dist',

        //默认页面
        'default':'index.html'
    },
    types:{
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    },
}
var PORT 		= conf.server.port;
var objRootPath = conf.server.path;
var defaultPage = conf.server.default;

var http	=	require('http');
var url		=	require('url');
var fs		=	require('fs');
var path	=	require('path');
var mine	=	conf.types;
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
if(!fsExistsSync(objRootPath)) {
    console.log('请先使用 npm run build 生成dist，再运行此脚本查看');
    return;
}
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += defaultPage; //指定为默认网页
    }
    var realPath = path.join(objRootPath, pathname); 

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {

            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    console.log(err);
                    response.end();
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
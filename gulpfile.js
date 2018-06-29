var gulp = require('gulp');
var less = require('gulp-less');
var squence = require('gulp-sequence');
var server = require('gulp-webserver');
var mock = require('./src/data/mock.js');
var mincss = require("gulp-clean-css");
var es5js = require('gulp-babel');
var minjs = require("gulp-uglify");
var htmlMin = require("gulp-htmlmin");
var path = require("path");
var fs = require("fs");
var userdata = require("./src/data/user/user").userInfo;
var user = {
    name: "zs",
    pwd: 1234
};
var userCheck = false;
var url = require('url');
gulp.task('testless', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest("dist/css"))
});
gulp.task('change', function() {
    gulp.watch("./src/css/*.less", ["testless"])
});
// gulp.task("testjs", function() {
//     gulp.src("./src/js/{common/,lib/,page/}*.js")
//         .pipe(es5js({
//             presets: "es2015"
//         }))
//         .pipe(gule.dest("dist/js"))
// });
// gulp.task("testhtml", function() {
//     gulp.src("./src/*.html")
//         .pipe(es5js())
//         .pipe(gule.dest("dist"))
// });
// gulp.task('server', function() {
//     gulp.src('src')
//         .pipe(server({
//             port: 1212,
//             host: "localhost",
//             // livereload: true,
//             // open: true,
//             middleware: function(req, res, next) {
//                 if (req.url === '/favicon.ico') {
//                     return;
//                 };

//                 var pathname = url.parse(req.url).pathname;
//                 pathname = pathname === '/' ? '/index.html' : pathname;
//                 if (/\/book\//.test(pathname)) {
//                     if (pathname === '/book/login' || pathname === '/book/reg') {
//                         var arr = [];
//                         req.on('data', function(chunk) {
//                             arr.push(chunk);
//                         });
//                         req.on('end', function() {
//                             var data = Buffer.concat(arr).toString();
//                             var obj = require('querystring').parse(data);
//                             if (pathname === '/book/login') {
//                                 var resule = userdata.some(function(v) {

//                                     return userdata.user == data.user && userdata.pwd == data.pwd
//                                 });
//                                 if (resule) {
//                                     res.end('{"result":"success"}');
//                                     userCheck = true;

//                                 } else {
//                                     res.end('{"result":"error"}');
//                                 }
//                                 console.log(resule)
//                             } else {
//                                 userdata.push(obj);
//                                 var userObj = {
//                                     userInfo: userdata
//                                 };
//                                 fs.writeFileSync('./src/data/user/user.json', JSON.stringify(userObj));
//                                 res.end('{"result":"success"}')
//                             }


//                         });
//                         return false;
//                     }
//                     res.end(JSON.stringify(mock(req.url)));
//                 } else {
//                     res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
//                 }

//                 if (req.url === '/book/loginSearch') {
//                     res.end('{"result":"' + userCheck + '"}')
//                 }
//                 next();

//             }
//         }))
// });
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8008,
            host: "localhost",
            // livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                // var uname = url.parse(req.url, true);
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/book/login' || pathname === '/book/reg') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data);
                        if (pathname === '/book/login') {
                            var resule = userdata.some(function(v) {

                                return userdata.user == data.userName && userdata.pwd == data.pwd
                            });
                            if (resule) {
                                res.end('{"result":"success"}');
                                userCheck = true;

                            } else {
                                res.end('{"result":"error"}');
                            }
                            console.log(resule)
                        } else {
                            userdata.push(obj);
                            var userObj = {
                                userInfo: userdata
                            };
                            fs.writeFileSync('./src/data/user/user.json', JSON.stringify(userObj));
                            res.end('{"result":"success"}')
                        }


                    });
                    return false;
                };
                if (req.url === '/loginSearch') {
                    res.end('{"result":"' + userCheck + '"}')
                }
                if (/\/book/g.test(pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                };
                next();
            }
        }))
});
gulp.task('default', function(cd) {
        squence("testless", "server", cd)
    })
    // gulp.task("default", "testjs")
    // gulp.task("default", "testhtml")
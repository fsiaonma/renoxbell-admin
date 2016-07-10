var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var jsPath = [
    "./src/js/*.js",
];

gulp.task("watch-js", ["js"], function() {
    gulp.watch(jsPath, ["js"]);
});

gulp.task("js", function() {
    gulp.src(jsPath)
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"));
});

gulp.task("default", ["watch-js"], function() {});
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");
var runSequence = require("run-sequence");
var obfuscate = require("gulp-obfuscate");

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: ["src"]
    }
  });
});

gulp.task("watch", ["browserSync"], function() {
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/*.css", browserSync.reload);
});

gulp.task("useref", function() {
  return gulp
    .src("src/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(obfuscate())
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src("src/img/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/img"));
});

gulp.task("fonts", function() {
  return gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("public", function() {
  return gulp.src("app/public/**/*").pipe(gulp.dest("dist/"));
});

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("build", function(callback) {
  runSequence("clean:dist", ["useref", "images", "fonts", "public"], callback);
});

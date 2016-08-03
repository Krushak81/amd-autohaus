var bs           = require('browser-sync');
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var minify       = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');

var basepath = "./";
var dist    = basepath + "dist/";


gulp.task("javascript", function() {

  var src = gulp.src([
                      "js/jquery.min.js",
                      "js/impressum.js",
                      "js/jquery.isotope.min.js",
                      "js/jquery.imagesloaded.min.js",
                      "js/jquery.fancybox-1.3.4.pack.js",
                      "js/jquery.appear.js",
                      "js/jquery.bxslider.js",
                      "js/bootstrap.js",
                      "js/retina-1.1.0.min.js",
                      "js/plugins-scroll.js",
                      "js/waypoint.min.js",
                      "js/jquery.easypiechart.js",
                      "js/custom.js",
                      "js/jquery.themepunch.revolution.min.js",
                      "js/jquery.countTo.js",
                      "js/script.js",
                      "js/gmap3.min.js"

                     ]);

  return src
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest("dist/js/"))
  ;
});

gulp.task("styles", function() {

  var src = gulp.src([
                       "css/*.css"
                     ]);

  return src
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest("dist/css/"))
  ;
});

gulp.task("fonts", function() {

    var src = gulp.src([
        basepath + "fonts/**/*"
    ]);

    return src
        .pipe(gulp.dest(dist + "fonts/"))
        ;

});

gulp.task("html", function() {

    var src = gulp.src([
        "./*.html"
    ]);

    return src
        .pipe(gulp.dest("dist/"))
        ;
});

gulp.task("images", function() {

    var src = gulp.src([
        basepath + "images/**/*"
    ]);

    return src
        .pipe(gulp.dest(dist + "images/"))
        ;

});

gulp.task("css-images", function() {

    var src = gulp.src([
        basepath + "css/images/**/*"
    ]);

    return src
        .pipe(gulp.dest(dist + "css/images/"))
        ;

});

gulp.task("assets", function() {

    var src = gulp.src([
        basepath + "assets/**/*"
    ]);

    return src
        .pipe(gulp.dest(dist + "assets/"))
        ;

});

gulp.task("watch", function() {
  gulp.watch("js/**/*", ["javascript"]);
  gulp.watch("css/**/*", ["styles"]);
  gulp.watch("index.html", ["styles", "javascript"]);
});

// Browser Sync

gulp.task("serve", ["javascript", "styles", "fonts" , "html", "images", "css-images", "assets"], function() {

    bs.init({
        server: {
            baseDir: dist,
            directory: false
        }
    });

    gulp.watch(basepath + "css/**/*.css", ["styles", bs.reload]);

    gulp.watch(basepath + "js/**/*.js", ["javascript", bs.reload]);

    gulp.watch(basepath + "images/**/*", ["images", bs.reload]);

    gulp.watch(basepath + "index.html", ["html", bs.reload]);
    

});

gulp.task("prototype", ["javascript", "styles", "fonts" , "html" , "images", "css-images", "assets"], function() {});
var {src, dest, watch}        = require('gulp');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
function bs() {

    serveSass();
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    watch("./src/*.html").on("change", reload);
    watch("./src/sass/**/*.sass", serveSass);
};

function serveSass() {
  return src("./src/sass/**/*.sass")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
        }))
      .pipe(dest("src/css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;
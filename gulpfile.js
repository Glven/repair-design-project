var {src, dest, watch, series}              = require('gulp');
var sass                                    = require('gulp-sass');
var autoprefixer                            = require('gulp-autoprefixer');
var browserSync                             = require('browser-sync').create();
var reload                                  = browserSync.reload;
var cleanCSS                                = require('gulp-clean-css');
var minify                                  = require('gulp-minify');
var htmlmin                                 = require('gulp-htmlmin');
var tinypng                                 = require('gulp-tinypng-compress');
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

function buildCSS(done) {
    src('src/css/**/**.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('./dist/css'));
    done();
}

function buildJS(done) {
    src(['src/js/**/**.js', '!src/js/**/*.min.js'])
        .pipe(minify({
            ext: {
                src: 'null',
                min:'.js'
            }
        }))
        .pipe(dest('./dist/js'));
    src('src/js/**.min.js')
        .pipe(dest('dist/js'));
    done();
}

function html(done) {
    src('src/**.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
    done();
}

function fonts(done) {
    src('src/fonts/**/**')
        .pipe(dest('dist/fonts'));
    done();
}

function php(done) {
    src('src/**.php')
        .pipe(dest('dist/'));
    src('src/phpMailer/**.php')
        .pipe(dest('dist/phpMailer'));
    done();
}

function imgmin(done) {
    src(['src/img/**/**.png', 'src/img/**/**.jpg'])
        .pipe(tinypng({key: '7Hf2BRQQ7y4ZDBRtK80mHzwzYQNH05sG'}))
        .pipe(dest('dist/img'));
    src('src/img/**/**.svg')
        .pipe(dest('dist/img'));
    done();
}

exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, fonts, php, imgmin);
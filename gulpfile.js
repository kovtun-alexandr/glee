const { src, dest, watch, parallel, series } = require('gulp'),
  scss            = require('gulp-sass'),
  concat          = require('gulp-concat'),
  autoprefixer    = require('gulp-autoprefixer'),
  uglify          = require('gulp-uglify'),
  imagemin        = require('gulp-imagemin'),
  del             = require('del'),
  browserSync     = require('browser-sync').create(),
  svgSprite       = require('gulp-svg-sprite'),
  svgmin          = require('gulp-svgmin'),
  cheerio         = require('gulp-cheerio'),
  replace         = require('gulp-replace'),
  rename          = require('gulp-rename'),
  nunjucksRender  = require('gulp-nunjucks-render');

function browsersync(){
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function nunjucks(){
  return src('app/nunjucks/*.njk')
    .pipe(nunjucksRender())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function styles(){
  return src('app/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    // .pipe(concat())
    .pipe(rename({
      suffix : '.min'
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts(){
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images(){
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function svgSpriteBuild(){
  return src('app/images/svg/icons/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('app/images/svg/sprite/'))
    .pipe(browserSync.stream())
}

function build(){
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist(){
  return del('dist')
}

function watching(){
  watch(['app/**/*.scss'], styles);
  watch(['app/nunjucks/*.njk','app/moduls/**/*.html'], nunjucks);
  watch(['app/images/svg/icons/*.svg'], svgSpriteBuild);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.images = images;
exports.nunjucks = nunjucks;
exports.svgSpriteBuild = svgSpriteBuild;
exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, svgSpriteBuild, scripts, browsersync, watching);
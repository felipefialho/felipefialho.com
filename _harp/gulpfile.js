'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');
const fontMagician = require('postcss-font-magician');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const lost = require('lost');
const rupture = require('rupture');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const harp = require('harp');

let reload = browserSync.reload;

const srcPaths = {
  css: 'public/_src/styl/**/*.styl',
  styl: [
    'public/_src/styl/style.styl',
    'node_modules/prismjs/themes/prism-okaidia.css' // PrismJS - Theme
  ],
  icons: 'public/_src/svg/icons/*.svg',
  svg: 'public/_src/svg/etc/*',
  img: 'public/assets/img/**/*',
  harp: [
    'public/**/*.jade',
    'public/**/*.md',
    'public/**/*.json'
  ],
  js: 'public/_src/js/**/*.js',
  vendors: [
    'node_modules/prismjs/prism.js', // PrismJS
    'node_modules/prismjs/components/prism-stylus.js', // PrismJS - Stylus
    'node_modules/prismjs/components/prism-bash.js' // PrismJS - Bash
  ]
};

const buildPaths = {
  build: 'public/assets/**/*',
  css: 'public/assets/css/',
  img: 'public/assets/img',
  svg: 'public/assets/svg/',
  js: 'public/assets/js/',
  vendors: 'public/_src/js/_core/'
};

function refresh() {
  setTimeout(function () {
    reload();
  }, 500);
}

gulp.task('css', () => {
  return gulp.src(srcPaths.styl)
    .pipe(stylus({
      use: [rupture(), poststylus([lost(), fontMagician(), rucksack({ autoprefixer: true })])],
      compress: false
    }))
    .pipe(gcmq())
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.css));
  refresh();
});

gulp.task('vendors', () => {
  return gulp.src(srcPaths.vendors)
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPaths.vendors));
});

gulp.task('js', () => {
  return gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPaths.js));
});

gulp.task('images', () => {
  return gulp.src(srcPaths.img)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(buildPaths.img));
  refresh();
});

gulp.task('svg', () => {
  return gulp.src(srcPaths.svg)
    .pipe(svgmin())
    .pipe(gulp.dest(buildPaths.svg));
  refresh();
});

gulp.task('icons', () => {
  return gulp.src(srcPaths.icons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true }))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').addClass('hide');
        $('[fill]').removeAttr('fill');
      },

      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(buildPaths.svg));
  refresh();
});

gulp.task('serve', () => {

  harp.server(__dirname, {
    port: 9999
  }, function () {

    browserSync({
      proxy: 'localhost:9999'
    });

    gulp.watch(srcPaths.harp, function () { reload(); });

    gulp.watch(srcPaths.css, ['css']);
    gulp.watch(srcPaths.img, ['images']);
    gulp.watch(srcPaths.icons, ['icons']);

  });
});

gulp.task('default', ['css', 'vendors', 'js', 'svg', 'icons', 'serve']);
gulp.task('build', ['css', 'vendors', 'js', 'images', 'svg', 'icons']);

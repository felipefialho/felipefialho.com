'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import stylus from 'gulp-stylus';
import poststylus from 'poststylus';
import rucksack from 'rucksack-css';
import fontMagician from 'postcss-font-magician';
import gcmq from 'gulp-group-css-media-queries';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import lost from 'lost';
import rupture from 'rupture';
import postcss from 'gulp-postcss';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import harp from 'harp';

var reload = browserSync.reload;

function onError(err) {
  console.log(err);
  this.emit('end');
}

function refresh() {
  setTimeout(function () {
    reload();
  }, 500);
}

const srcPaths = {
  css: 'public/_src/styl/**/*.styl',
  styl: [
    'public/_src/styl/style.styl',
    'node_modules/prismjs/themes/prism.css',        // PrismJS
    'node_modules/prismjs/themes/prism-okaidia.css' // PrismJS - Theme
  ],
  icons: 'public/_src/svg/icons/*.svg',
  svg: 'public/_src/svg/etc/*',
  img: 'public/_src/img/**/*',
  harp: [
    'public/**/*.jade', 
    'public/**/*.md', 
    'public/**/*.json'
  ], 
  js: 'public/_src/js/**/*.js',
  vendors: [
    'node_modules/prismjs/prism.js',                   // PrismJS
    'node_modules/prismjs/components/prism-stylus.js', // PrismJS - Stylus
    'node_modules/prismjs/components/prism-bash.js'    // PrismJS - Bash
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

gulp.task('css', () => {
  gulp.src(srcPaths.styl)
    .pipe(stylus({
      use: [rupture(), poststylus([lost(), fontMagician(), rucksack({ autoprefixer: true })])],
      compress: false
    }))
    .on('error', onError)
    .pipe(gcmq())
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.css));
  refresh();
});
 
gulp.task('vendors', () => {
  gulp.src(srcPaths.vendors)
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPaths.vendors));
});

gulp.task('js', () => {
  gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .on('error', onError)
    .pipe(gulp.dest(buildPaths.js));
});

gulp.task('images', () => {
  gulp.src(srcPaths.img)
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
  gulp.src(srcPaths.svg)
    .pipe(svgmin())
    .pipe(gulp.dest(buildPaths.svg));
  refresh();
});

gulp.task('icons', () => {
  gulp.src(srcPaths.icons)
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
    port: 9000
  }, function () {

    browserSync({
      proxy: 'localhost:9000'
    });

    gulp.watch(srcPaths.harp, function () { reload(); });

    gulp.watch(srcPaths.css, ['css']);
    gulp.watch(srcPaths.img, ['images']);
    gulp.watch(srcPaths.icons, ['icons']);

  });
});

gulp.task('default', ['css', 'vendors', 'js', 'svg', 'icons', 'serve']);
gulp.task('build', ['css', 'vendors', 'js', 'images', 'svg', 'icons']);


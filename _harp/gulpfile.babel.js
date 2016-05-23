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
  setTimeout(function() {
    reload();
  }, 500);
}

const srcPaths = {
  css: 'public/_src/styl/**/*.styl',
  styl: 'public/_src/styl/style.styl',
  icons: 'public/_src/svg/icons/*.svg',
  svg: 'public/_src/svg/etc/*',
  img: 'public/_src/img/**/*',
  harp: ['public/**/*.jade', 'public/**/*.md', 'public/**/*.json']
};

const buildPaths = {
  build: 'public/assets/**/*',
  css: 'public/assets/css/',
  img: 'public/assets/img',
  svg: 'public/assets/svg/',
};

gulp.task('css', () => {
  gulp.src(srcPaths.styl)
    .pipe(stylus({
      use: [rupture(), poststylus([lost(), fontMagician(), rucksack({ autoprefixer: true })])],
      compress: false
    }))
    .on('error', onError)
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.css));
    refresh();
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
    .pipe(gulp.dest(buildPaths.svg))
    refresh();
});

gulp.task('icons', () => {
  gulp.src(srcPaths.icons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(buildPaths.svg))
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

  })
});

gulp.task('default', ['css', 'images', 'svg', 'icons', 'serve']);
gulp.task('build', ['css', 'images', 'svg', 'icons']);


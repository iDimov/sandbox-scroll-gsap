import gulp from 'gulp';
import watch from 'gulp-watch';
import postcss from 'gulp-postcss';
import pimport from "postcss-partial-import";
import pcssnext from "postcss-cssnext";
import pinline_svg from 'postcss-inline-svg';
import psvgo from 'postcss-svgo';
import pnested from 'postcss-nested';
import browserSync from "browser-sync";
import gfinclude from 'gulp-file-include';
import imagemin from 'gulp-imagemin';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import babel from 'gulp-babel';


const path = {
	dist: {
		html: 'dist/',
    js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/i/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'src/html/*.html',
		style: 'src/css/styles.css',
		img: 'src/i/*.*',
		fonts: 'src/fonts/**/*',
        js: 'src/js/*.js',
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		css: 'src/css/**/**.css',
		img: 'src/i/*.*',
		fonts: 'src/fonts/**/*'
	}
};

const bsConfig = {
    server: {
        baseDir: "./dist"
    },
    port: 3000,
    logPrefix: 'browserSync',
    open: true
};
const reload = browserSync.reload;

gulp.task('html:build', () => {
	gulp.src(path.src.html)
    .pipe(gfinclude({
      prefix: '@@',
      basepath: 'src/html/tmpl'
    }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', () => {
const processors = [
    pimport,
    pnested,
    pcssnext,
    pinline_svg,
    psvgo
  ];
const min = [
    cssnano
  ]; 
gulp.src(path.src.style)
    .pipe(postcss(processors))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}))
    .pipe(postcss(min))
    .pipe(rename({
        suffix: '.min'
        }))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('js:build', () => {
    gulp.src(path.src.js)
    .pipe(babel())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({stream: true}));;
});
gulp.task('image:build', () => {
    gulp.src(path.src.img)
			.pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:build', () => {
    gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.dist.fonts));
});

gulp.task('build', [
	'html:build',
    'style:build',
    'js:build',
	'image:build',
	'fonts:build'
]);

gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.css], (event, cb) => {
        gulp.start('style:build');
    });
		watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
		watch([path.watch.img], (event, cb) => {
        gulp.start('image:build');
    });
		watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', () => {
    browserSync(bsConfig);
});

gulp.task('default', ['build', 'webserver', 'watch']);
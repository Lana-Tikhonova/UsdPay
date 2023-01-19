const gulp = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');

const config = {
	paths: {
		//base: 'assets',
		entry: {
			js: [
				'templates/src/vendors/jquery/jquery-3.5.1.min.js',
				'templates/src/vendors/imask/imask.js',
				'templates/src/vendors/select2/select2.full.min.js',
				'templates/src/vendors/chart/Chart.min.js',
				'templates/src/vendors/apexcharts/apexcharts.min.js',
				'templates/src/vendors/easepick/easepick.umd.min.js',
				'templates/src/vendors/swiper/swiper-bundle.min.js',
				'templates/src/js/common.js'
			],
			scss: [
				'templates/src/vendors/select2/select2.min.css',
				'templates/src/vendors/apexcharts/apexcharts.css',
				'templates/src/vendors/swiper/swiper-bundle.min.css',
				'templates/src/scss/*.scss'
			],
			imgs: 'templates/src/imgs/**/*'
		},
		output: {
			js: 'templates/assets/js',
			css: 'templates/assets/css',
			imgs: 'templates/assets/imgs'
		},
		watch: {
			scss: 'templates/src/scss/*.scss',
			js: 'templates/src/js/**/*.js'
		}
	}
}

/*
gulp.task('browser-sync', function () {
	browserSync({
		proxy: '',
		// baseDir: config.paths.base,
		notify: false,
	})
})
*/

//комплилим жс
gulp.task('js', function () {
	return gulp
		.src(config.paths.entry.js)
		.pipe(concat('bundle.min.js'))
		/*.pipe(uglify())*/
		.pipe(gulp.dest(config.paths.output.js))
		.pipe(browserSync.stream())
})

//компилим css
gulp.task('scss', function () {
	return gulp
		.src(config.paths.entry.scss)
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(autoprefixer(['last 2 versions']))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest(config.paths.output.css))
		.pipe(browserSync.stream())
})

//сжимаем картинки
gulp.task('imagemin', function () {
	return gulp
		.src(config.paths.entry.imgs)
		.pipe(imagemin([
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			})
		]))
		.pipe(gulp.dest(config.paths.output.imgs))
})

//смотрим за изменением файлов и перекомпиливаем стили и скрипты
gulp.task('watch', function () {
	gulp.watch(config.paths.watch.scss, gulp.series('scss'))
	gulp.watch(config.paths.watch.js, gulp.series('js'))
})

//все полностью собираем
gulp.task('build', gulp.parallel('scss', 'js'))
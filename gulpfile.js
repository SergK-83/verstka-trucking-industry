'use strict'

let path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js_main: 'src/js/main.js',
		js_libs: 'src/js/libs.js',
		maine_style: 'src/scss/main/main.scss',
		libs_style: 'src/scss/libs/libs.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js_main: 'src/js/main.js',
		js_libs: 'src/js/libs.js',
		css_main: 'src/scss/main/**/*.scss',
		css_libs: 'src/scss/libs/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'srs/fonts/**/*.*'
	},
	clean: './build/*'
};

/* настройки сервера */
let config = {
	server: {
		baseDir: './build'
	},
	notify: false
};

/* подключаем gulp и плагины */
let gulp = require('gulp'),  // подключаем Gulp
	webserver = require('browser-sync'), // сервер для работы и автоматического обновления страниц
	plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
	fileinclude = require('gulp-file-include'),
	rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
	sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
	sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
	autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
	cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
	uglify = require('gulp-uglify-es').default, // модуль для минимизации JavaScript
	cache = require('gulp-cache'), // модуль для кэширования
	imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
	jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg
	pngquant = require('imagemin-pngquant'), // плагин для сжатия png
	rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
	rename = require('gulp-rename');

/* задачи */

// запуск сервера
gulp.task('webserver', function () {
	webserver(config);
});

// сбор html
gulp.task('html:build', function () {
	return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
		.pipe(plumber()) // отслеживание ошибок
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		})) // импорт вложений
		.pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
		.pipe(webserver.reload({ stream: true })); // перезагрузка сервера
});

// сбор стилей
gulp.task('css-main:build', function () {
	return gulp.src(path.src.maine_style) // получим main.scss
		.pipe(plumber()) // для отслеживания ошибок
		.pipe(sourcemaps.init()) // инициализируем sourcemap
		.pipe(sass().on('error', sass.logError)) // scss -> css
		.pipe(autoprefixer()) // добавим префиксы
		.pipe(gulp.dest(path.build.css))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleanCSS()) // минимизируем CSS
		.pipe(sourcemaps.write('./')) // записываем sourcemap
		.pipe(gulp.dest(path.build.css)) // выгружаем в build
		.pipe(webserver.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('css-libs:build', function () {
	return gulp.src(path.src.libs_style) // получим main.scss
		.pipe(plumber()) // для отслеживания ошибок
		.pipe(sourcemaps.init()) // инициализируем sourcemap
		.pipe(sass().on('error', sass.logError)) // scss -> css
		.pipe(autoprefixer()) // добавим префиксы
		.pipe(gulp.dest(path.build.css))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleanCSS()) // минимизируем CSS
		.pipe(sourcemaps.write('./')) // записываем sourcemap
		.pipe(gulp.dest(path.build.css)) // выгружаем в build
		.pipe(webserver.reload({ stream: true })); // перезагрузим сервер
});

// сбор js
gulp.task('js-main:build', function () {
	return gulp.src(path.src.js_main) // получим файл main.js
		.pipe(plumber()) // для отслеживания ошибок
		.pipe(gulp.dest(path.build.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.init()) //инициализируем sourcemap
		.pipe(uglify()) // минимизируем js
		.pipe(sourcemaps.write('./')) //  записываем sourcemap
		.pipe(gulp.dest(path.build.js)) // положим готовый файл
		.pipe(webserver.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('js-libs:build', function () {
	return gulp.src(path.src.js_libs) // получим файл main.js
		.pipe(plumber()) // для отслеживания ошибок
		.pipe(rigger()) // импортируем все указанные файлы в main.js
		.pipe(gulp.dest(path.build.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.init()) //инициализируем sourcemap
		.pipe(uglify()) // минимизируем js
		.pipe(sourcemaps.write('./')) //  записываем sourcemap
		.pipe(gulp.dest(path.build.js)) // положим готовый файл
		.pipe(webserver.reload({ stream: true })); // перезагрузим сервер
});

// перенос шрифтов
gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

gulp.task('add-libs:build', function () {
    return gulp.src([
        'src/libs/**/*'
    ])
        .pipe(gulp.dest('build/libs'))
		.pipe(webserver.reload({ stream: true })); // перезагрузим
});

// обработка картинок
gulp.task('image:build', function () {
	return gulp.src(path.src.img) // путь с исходниками картинок
		.pipe(cache(imagemin([ // сжатие изображений
			imagemin.gifsicle({ interlaced: true }),
			jpegrecompress({
				progressive: true,
				max: 90,
				min: 80
			}),
			pngquant(),
			imagemin.svgo({ plugins: [{ removeViewBox: false }] })
		])))
		.pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

// удаление каталога build
gulp.task('clean:build', function () {
	return gulp.src(path.clean, { read: false })
		.pipe(rimraf());
});

// очистка кэша
gulp.task('cache:clear', function () {
	cache.clearAll();
});

// сборка
gulp.task('build',
	gulp.series('clean:build',
		gulp.parallel(
			'html:build',
			'css-main:build',
			'css-libs:build',
			'js-main:build',
			'js-libs:build',
			'fonts:build',
			'image:build',
			'add-libs:build'
		)
	)
);

// запуск задач при изменении файлов
gulp.task('watch', function () {
	gulp.watch(path.watch.html, gulp.series('html:build'));
	gulp.watch(path.watch.css_main, gulp.series('css-main:build'));
	gulp.watch(path.watch.css_libs, gulp.series('css-libs:build'));
	gulp.watch(path.watch.js_main, gulp.series('js-main:build'));
	gulp.watch(path.watch.js_libs, gulp.series('js-libs:build'));
	gulp.watch(path.watch.img, gulp.series('image:build'));
	gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
	gulp.watch(path.watch.fonts, gulp.series('add-libs:build'));
});

// задача по умолчанию
gulp.task('default', gulp.series(
	'build',
	gulp.parallel('webserver','watch')
));
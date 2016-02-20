var gulp = require('gulp'),
    del = require('del'),
	browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    src = {
        root: 'src',
        html: 'src/*.html',
        css: 'src/**/*.css',
        js: 'src/**/*.js',
        app: 'src/main.jsx'
    },
    dest = 'build',
    bundleName = 'app.js';

/**
 * Clean
 */
gulp.task('clean', function() {
	del(dest);
});
    
/**
 * Copy HTML
 */
gulp.task('html', function() {
    gulp.src(src.html).
    pipe(gulp.dest(dest));
});

/**
 * Watch HTML
 */
gulp.task('watch:html', ['html'], function() {
    gulp.watch(src.html, ['html']);
});
    
/**
 * Copy css
 */
gulp.task('css', function() {
    gulp.src(src.css).
    pipe(gulp.dest(dest));
});

/**
 * Watch css
 */
gulp.task('watch:css', ['css'], function() {
    gulp.watch(src.css, ['css']);
});
    
/**
 * Copy js
 */
gulp.task('js', function() {
    gulp.src(src.js).
    pipe(gulp.dest(dest));
});

/**
 * Watch js
 */
gulp.task('watch:js', ['js'], function() {
    gulp.watch(src.js, ['js']);
});

/**
 * Make bundle app with browserify
 */
gulp.task('bundle', function() {
    return browserify({entries: src.app, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(bundleName))
        .pipe(gulp.dest(dest));
});

/**
 * Watch bundle
 */
gulp.task('watch:bundle', ['bundle'], function() {
    gulp.watch(src.app, ['bundle']);
});

/**
 * Default
 */
gulp.task('default', [
	'watch:html',
	'watch:css',
	'watch:js',
	'watch:bundle'
]);

/**/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({pattern: '*'});

gulp.task('bowerUpdate', $.shell.task([
    'bower install'
]))

gulp.task('compileVendorJS', function () {
    return gulp.src($.mainBowerFiles({filter: "**/*.js"}))
        .pipe($.filelog())
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('./lib'))
        .pipe($.notify({message: 'Vendor JS compiled!'}));
});

gulp.task('bundleAMD', function () {
    return gulp.src("html/js/**/*.js")
        .pipe($.amdOptimize('app/main'))
        .pipe($.concat('amd-bundle.js'))
        .pipe($.insert.append('require(["app/main"]);'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('bundleCombine', function () {
    return gulp.src(["lib/vendor.js", "dist/amd-bundle.js"])
        .pipe($.concat('app.min.js', {
            newLine:';'
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('build', function (params) {
    $.runSequence('bowerUpdate', 'compileVendorJS', 'bundleAMD', 'bundleCombine');
});

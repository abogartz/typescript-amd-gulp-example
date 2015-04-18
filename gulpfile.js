var gulp = require('gulp');
var $ = require('gulp-load-plugins')({pattern: '*'});

gulp.task('bowerUpdate', $.shell.task([
    'bower install'
]))

gulp.task('compileVendorJS', function () {
    return gulp.src($.mainBowerFiles({filter: "**/*.js"}))
        .pipe($.filelog())
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('./'))
        .pipe($.notify({message: 'Vendor JS compiled!'}));
});

gulp.task('bundleAMD', function () {
    return gulp.src("html/js/**/*.js")
        .pipe($.amdOptimize('main'))
        .pipe($.concat('amd-bundle.js'))
        .pipe($.insert.append('require(["main"]);'))
        .pipe(gulp.dest('./'))
});

gulp.task('bundleCombine', function () {
    return gulp.src(["vendor.js", "amd-bundle.js"])
        .pipe($.concat('app.min.js', {
            newLine:';'
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('./'))
});

gulp.task('build', function (params) {
    $.runSequence('bowerUpdate', 'compileVendorJS', 'bundleAMD', 'bundleCombine');
});

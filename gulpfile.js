const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false//chokidar
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                //不让外部的.babelrc印象内部
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});
gulp.task('buildconfig', function () {
    gulp.src('./src/nodeuii/config/*.js')
        .pipe(rollup({
            format: "cjs",
            input: './src/nodeuii/config/index.js',
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./build/config'));
});
gulp.task('buildprod', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            //不让外部的.babelrc印象内部
            babelrc: false,
            // ignore: ['./src/nodeuii/config/*.js'],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('build'));
});
let _task = ["builddev"];
//上线
if (process.env.NODE_ENV == "production") {
    _task = ["buildprod"];
}
//上线代码优化
if (process.env.NODE_ENV == "config") {
    _task = ["buildconfig"];
}
gulp.task("default", _task);

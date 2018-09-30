const gulp = require("gulp");

const environment = {
    paths:
    {
        sources: {
            pcss: "src/pcss/*.pcss",
            html: "src/html/*.html",
        },

        destinations: {
            biuld: "build/"
        }
    }
};

const pcss = () =>
{
    return gulp
    .src(environment.paths.sources.pcss)
    .pipe(require("gulp-postcss")([ require("precss"), require("autoprefixer") ]))
    .pipe(gulp.dest(environment.paths.destinations.biuld));
};

const html = () =>
{
    return gulp
    .src(environment.paths.sources.html)
    .pipe(gulp.dest(environment.paths.destinations.biuld));
};

const compile = gulp.series(pcss, html);
compile.description = "compile all"

const watch = () =>
{
    gulp.watch([environment.paths.sources.pcss, environment.paths.sources.html], compile);
};

const serve = () =>
{
    gulp
    .src(environment.paths.destinations.biuld)
    .pipe(require("gulp-webserver")());
};

const all = gulp.parallel(compile, serve, watch);
all.description = "run-time compilation, served at localhost:8000";

gulp.task("default", all);

exports.compile = compile;
exports.all = all;
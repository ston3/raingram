var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    babel = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gbabel = require('gulp-babel'),
    watchify = require('watchify');

gulp.task('styles',function(){
    gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'));
})

gulp.task('assets', function(){
    gulp
        .src('assets/*')
        .pipe(gulp.dest('public'));

})
//script with browserify

gulp.task('scripts',function(){
    browserify('./src/index.js')

        
})

function compile(watch){
    var bundle = watchify(browserify('./src/index.js'));

    function rebundle(){
        bundle
            .transform(babel)
            .bundle()
            .pipe(source('index.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public'));    
    }
    if(watch){
        bundle.on('update', function(){
            console.log('-->Bundling Stone.....');
            rebundle();
        })
    }
    rebundle();
}

gulp.task('build',function(){
    return compile();
})

gulp.task('watch',function(){
    return compile(true);
})

gulp.task('default',['styles','assets','build']);
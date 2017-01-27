var gulp = require('gulp');

var jshint = require('gulp-jshint'); //js代码校验
var stylish=require('jshint-stylish');
var less = require('gulp-less'); //less的编译
var concat = require('gulp-concat'); //合并文件
var uglify= require('gulp-uglify'); //压缩js代码
var rename= require('gulp-rename'); //文件重命名
var livereload=require('gulp-livereload'); //自动刷新页面
var minifyCss=require('gulp-minify-css'); //压缩css
var gutil=require('gulp-util'); //进行错误处理，监听 error 事件进行错误处理从而避免 gulp 进程崩溃



//开发环境目录
var devPaths = {
    js: 'develop/javascripts/',
    css: 'develop/stylesheets/'
}

//生产环境目录
var productPaths={
    js:'public/javascripts/',
    css:'public/stylesheets/'
}



//检查脚本语法
gulp.task('lint',function(){
     gulp.src(devPaths.js+'*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


//编译Less，压缩css
gulp.task('less',function(){
    gulp.src(devPaths.css+'*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(productPaths.css))
        .pipe(rename('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(productPaths.css));
});


//合并，压缩文件
gulp.task('scripts',function(){
    gulp.src(devPaths.js+'*.js')

        .pipe(concat('all.js'))
        .on('error', function(err) {
            gutil.log('JS Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(productPaths.js))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .on('error', function(err) {
            gutil.log('JS Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(productPaths.js));
});



gulp.task('default',function(){
    var server=livereload();
    gulp.start('lint','less','scripts');
    gulp.watch(devPaths.css+'**/*',['less']);
    gulp.watch(devPaths.js+'**/*',['lint','scripts']);
//用 './xx' 开头作为当前路径开始，会导致无法监测到新增文件，需省略掉 './'
    gulp.watch('views/**/*.*',function(file){
        server.change(file.path);
    });

    console.log('Watching files changes');
});























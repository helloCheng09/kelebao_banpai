const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const cleanCSS = require('gulp-clean-css')
const jsRemove = require('gulp-remove-logging')
const strip = require("gulp-strip-debug")
const concat = require('gulp-concat');
// 开启服务
const connect = require('gulp-connect')

const folder = {
    src: "./src/",
    build: "./build/"
}

//判断开发环境
// 用gitbash设置当前环境变量
// export NODE_ENV=development
const devMod = process.env.NODE_ENV == 'development'
console.log('当前环境变量是' + devMod)

// html
gulp.task("html", () => {
    return gulp.src(folder.src + "html/*.html")
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.build + "html"))
})

// css
gulp.task("css", () => {
    return gulp.src(folder.src + "css/*.css")
        .pipe(connect.reload())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(folder.build + "css"))
})
// img
gulp.task("img", () => {
    return gulp.src(folder.src + "img/*")
        .pipe(gulp.dest(folder.build + "img"))
})
// concat
gulp.task("concat", () => {
    return gulp.src([folder.src + "js/wx.jsdk.js", folder.src + "js/click.js", folder.src + "js/render.js", folder.src + "js/getData.js", folder.src + "js/index.js"])
        .pipe(concat('jl_all.js'))
        .pipe(gulp.dest(folder.src + "js"))
})
// js
gulp.task("js", () => {
    var page = gulp.src(folder.src + "js/*.js")
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(strip())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.build + "js"))

    return page
})

// layui
gulp.task("layui", () => {
    return gulp.src(folder.src + "js/layui/")
        .pipe(gulp.dest(folder.build + "js/layui/"))
})

// 开启服务
gulp.task('serve', function () {
    connect.server({
        // 更新刷新
        livereload: true
    })
})
// 监听
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*.html', ['html'])
    gulp.watch(folder.src + 'css/*.css', ['css'])
    gulp.watch(folder.src + 'js/*.js', ['js'])
})
// gulp.task("default", ["html", "css", "img", "js", "layui"])
gulp.task("default", ["css", "js", 'html', 'watch', 'serve'])
//加载模块
var gulp = require("gulp");
const uglify = require('gulp-uglify');
// 对html进行压缩的包
const htmlmin = require('gulp-htmlmin');
/*开启任务 参数：任务名称、依赖的任务、回调函数方法
 * 机制：管道     输入源         输出源
 *       pipe    src(路径)     dest(路径)
 * 运行gulp:在cmd中gulp 任务名
 *    **0个或多个子文件夹
 * 图片压缩添加插件：cnpm install gulp-imagemin --save-dev
 * 编译sass及压缩css cnpm install gulp-sass-china --save-dev
 * 监听：watch
 * 
 */
//将src中的所有文件复制到dist中
gulp.task("copysrc",function(){
	gulp.src("src/**/*").pipe(gulp.dest("dist"))
})
//图片压缩
var imgMin = require("gulp-imagemin");
gulp.task("imgMin",function(){
	gulp.src("src/img/**/*")
	.pipe(imgMin())
	.pipe(gulp.dest("dist/img"))
})
//sass编译
var bSass = require("gulp-sass-china");
gulp.task("bSass",function(){
	gulp.src("src/sass/*.scss")
	.pipe(bSass({
		outputStyle:"expanded"
	}))
	.pipe(gulp.dest("src/css"))
})
//监听sass
gulp.task("addEvent",function(){
	gulp.watch("src/sass/*.scss",["bSass"])
})
//服务器
var content = require("gulp-connect");
gulp.task("content",function(){
	content.server({
		root:"src",
		port:7744,
		livereload:true
	})
})

gulp.task("server-watch",function(){
	gulp.watch("src/sass/*.scss",["bSass"])
	
	gulp.watch(["src/html/*.html","src/css/*.css"],function(){
		gulp.src("src/html/*")
		.pipe(content.reload())
	})
})

gulp.task("connect",["content","server-watch"])
// 对js请求进行压缩和混淆
// 定义任务
gulp.task('myscript', function() {
  // 1.匹配要处理的文件
  gulp.src('src/js/*.js')
      // 2.将js代码压缩混淆
       .pipe(uglify())
       .pipe(gulp.dest('dist/js'))
})

const cssnano = require('gulp-cssnano')


// 定义任务
gulp.task('mycss', function(){
     // 1.
     gulp.src('src/css/*.css')
     .pipe(cssnano())// 消化，转换，压缩
     .pipe(gulp.dest('dist/css'))
})
var imagemin = require('gulp-imagemin');
gulp.task('img', function(){
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});
// 对html进行压缩
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
var gulp = require('gulp');
var concat = require('gulp-concat');  //合并
var uglify = require('gulp-uglify');  //JS 压缩
var autoprefix = require('gulp-autoprefixer'); //根据设置浏览器版本自动处理浏览器前缀
var minifyCSS = require('gulp-minify-css'); //css 压缩
var htmlmin = require('gulp-htmlmin');      //html 压缩
var rev = require('gulp-rev');//对文件名加MD5后缀
var clean = require('gulp-clean');//清理
var revCollector = require('gulp-rev-collector');//路径替换
var runSequence = require('run-sequence');
var stripDebug = require('gulp-strip-debug');


/*************合并压缩****************/
gulp.task('barcode-min', function () {
  return gulp.src(['./script/barcode/*.js'])
    .pipe(concat('barcode.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./script/'));
});

// gulp.task('cryptojs-min', function () {
//   return gulp.src(['./script/CryptoJS1/*.js'])
//     .pipe(concat('cryptojs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./script/'));
// });

gulp.task('common-min', function () {
  return gulp.src(['./script/common/*.js'])
    .pipe(concat('common.min.js'))
//  .pipe(uglify())
    .pipe(gulp.dest('./script/'));
});

gulp.task('aui-min', function () {
  return gulp.src(['./script/aui/*.js'])
    .pipe(concat('aui.min.js'))
//  .pipe(uglify())
    .pipe(gulp.dest('./script/'));
});

gulp.task('plugins-min', function () {
  return gulp.src(['./script/plugins/*.js'])
    .pipe(concat('plugins.min.js'))
//  .pipe(uglify())
    .pipe(gulp.dest('./script/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles-min', function () {
  return gulp.src(['./css/styles/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(autoprefix({
      browsers: ['last 5 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('./css/'));
});


//清理文件
gulp.task('clean', function () {
  return gulp.src(['./dest/','./rev/','./script/*.js','./css/*.css'], { read: false })
    .pipe(clean());
});

// 拷贝不处理文件
gulp.task('copy-file', function () {
  gulp.src(['./css/*.ttf','./css/*.woff','./css/*.woff2','./css/*.eot','./css/*.svg'])
    .pipe(gulp.dest('./dest/css/'));

  gulp.src(['./*.xml'])
    .pipe(gulp.dest('./dest/'));
    
  gulp.src('./script/chart/*.js')
    .pipe(gulp.dest('./dest/script/chart/'));

  gulp.src('./script/CryptoJS/*.js')
    .pipe(gulp.dest('./dest/script/CryptoJS/'));

  gulp.src('./image/**/*')
    .pipe(gulp.dest('./dest/image/'));

  gulp.src('./html/*.png')
    .pipe(gulp.dest('./dest/html/'));
});

/**************增加版本号并另存到dest**************/
gulp.task('ver-js', function () {
  return gulp.src(['./script/*.js'])
//	.pipe(stripDebug())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dest/script'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/js'));
});

gulp.task('ver-biz-js', function() {
	return gulp.src(['./script/biz/*.js'])
//		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./dest/script/biz/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/bizjs'));
});

gulp.task('ver-css', function () {
  return gulp.src(['./css/*.css'])
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest('./dest/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/css'));
});

/*************app特有不带版本**************/
gulp.task('no-ver-js', function () {
  return gulp.src(['./script/*.js'])
//	.pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dest/script'))
});

gulp.task('no-ver-biz-js', function() {
	return gulp.src(['./script/biz/*.js'])
//		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./dest/script/biz/'))
});

gulp.task('no-ver-css', function () {
  return gulp.src(['./css/*.css'])
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dest/css'))
});

/***********路径替换任务**************/
gulp.task('rev-html', function () {
  return gulp.src(['./rev/*/*.json', './html/**'])
    .pipe(revCollector())
    .pipe(gulp.dest('./dest/htmlbak/'));
});

gulp.task('rev-index', function () {
  return gulp.src(['./rev/*/*.json', './*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('html-min', function () {
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

  return gulp.src('./dest/htmlbak/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./dest/html/'));
});

gulp.task('bak-clean', function () {
  return gulp.src(['./dest/htmlbak'], { read: false })
    .pipe(clean());
});

gulp.task('rev-clean', function () {
  return gulp.src(['./rev'], { read: false })
    .pipe(clean());
});

gulp.task('watch-plugins',function(){
  gulp.watch('./script/plugins/*.js',['plugins-min']);
});

gulp.task('watch-css',function(){
  gulp.watch('./css/styles/*.css',['styles-min']);
});

gulp.task('watch-aui',function(){
  gulp.watch('./script/aui/*.js',['aui-min']);
})

gulp.task('default', function (cb) {
  runSequence(
    'clean', // 第一步：清理目标目录
    ['aui-min', 'barcode-min', 'common-min', 'plugins-min', 'styles-min'], // 第二步：合并
    'watch-plugins',
    'watch-aui',
    'watch-css',
    cb
  );
});

gulp.task('web', function (cb) {
  runSequence(
    'clean', // 第一步：清理目标目录
    ['aui-min', 'barcode-min', 'common-min', 'plugins-min', 'styles-min'], // 第二步：合并
   'copy-file',
   ['ver-js','ver-biz-js', 'ver-css'],      //压缩加版本号
   ['rev-html', 'rev-index'],  //修改路径
   'html-min', //HTML压缩
   'bak-clean',//清理BAK目录
   'rev-clean',
    cb
  );
});

gulp.task('app', function (cb) {
  runSequence(
    'clean', // 第一步：清理目标目录
    ['aui-min', 'barcode-min', 'common-min', 'plugins-min', 'styles-min'], // 第二步：合并
   'copy-file',
   ['no-ver-js','no-ver-biz-js', 'no-ver-css'],      //压缩加版本号
   ['rev-html', 'rev-index'],  //修改路径
   'html-min', //HTML压缩
   'bak-clean',//清理BAK目录
   'rev-clean',
    cb
  );
});
var gulp = require('gulp');
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); //JS 压缩
var autoprefix = require('gulp-autoprefixer'); //根据设置浏览器版本自动处理浏览器前缀
var minifyCSS = require('gulp-clean-css'); //css 压缩
var htmlmin = require('gulp-htmlmin'); //html 压缩
var rev = require('gulp-rev'); //对文件名加MD5后缀
var clean = require('gulp-clean'); //清理
var revCollector = require('gulp-rev-collector'); //路径替换
var runSequence = require('run-sequence');
var stripDebug = require('gulp-strip-debug');
var babel = require('gulp-babel');

/*************合并压缩****************/

gulp.task('aui-min', function() {
	return gulp.src(['./Js/aui/*.js'])
		.pipe(concat('aui.min.js'))
		//  .pipe(uglify())
		.pipe(gulp.dest('./Js/'));
});

gulp.task('barcode-min', function() {
	return gulp.src(['./Js/barcode/*.js'])
		.pipe(concat('barcode.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./Js/'));
});

gulp.task('common-min', function() {
	return gulp.src(['./Js/common/*.js'])
		.pipe(concat('common.min.js'))
		//  .pipe(uglify())
		.pipe(gulp.dest('./Js/'));
});

gulp.task('component-min', function() {
	return gulp.src(['./Js/component/*.js'])
		.pipe(concat('component.min.js'))
		//  .pipe(uglify())
		.pipe(gulp.dest('./Js/'));
});

gulp.task('plugins-min', function() {
	return gulp.src(['./Js/plugins/*.js'])
		.pipe(concat('plugins.min.js'))
		//  .pipe(uglify())
		.pipe(gulp.dest('./Js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles-min', function() {
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
gulp.task('clean', function() {
	return gulp.src(['./dist/', './rev/', './Js/*.js', './css/*.css'], {
			read: false
		})
		.pipe(clean());
});

// 拷贝不处理文件
gulp.task('copy-file', function() {

	gulp.src('./font/*.*')
		.pipe(gulp.dest('./dist/font/'));

	gulp.src('./fonts/*.*')
		.pipe(gulp.dest('./dist/fonts/'));

	gulp.src('./Js/CryptoJS/*.js')
		.pipe(gulp.dest('./dist/Js/CryptoJS/'));

	gulp.src('./Images/**/*')
		.pipe(gulp.dest('./dist/Images/'));
		
	gulp.src('./Res/**/*')
		.pipe(gulp.dest('./dist/Res/'));

	gulp.src('./Js/others/**/*')
		.pipe(gulp.dest('./dist/Js/others/'));
});

/**************增加版本号并另存到debug**************/
gulp.task('ver-js', function() {
	return gulp.src(['./Js/*.js'])
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./dist/Js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/js'));
});

gulp.task('ver-biz-js', function() {
	return gulp.src(['./Js/biz/*.js'])
		.pipe(stripDebug())
		.pipe(babel({
            presets: ['es2015']
        }))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./dist/Js/biz/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/bizjs'));
});

gulp.task('ver-css', function() {
	return gulp.src(['./css/*.css'])
		.pipe(minifyCSS())
		.pipe(rev())
		.pipe(gulp.dest('./dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/css'));
});

/***********路径替换任务**************/
gulp.task('rev-html', function() {
	return gulp.src(['./rev/*/*.json', './Views/**'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist/Viewsbak/'));
});

gulp.task('rev-admin', function() {
	return gulp.src(['./rev/*/*.json', './admin/**'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist/adminbak/'));
});

gulp.task('rev-interface', function() {
	return gulp.src(['./rev/*/*.json', './interface/*.html','./interface/*.php'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist/interfacebak/'));
});

gulp.task('rev-index', function() {
	return gulp.src(['./rev/*/*.json', './*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('web-min', function() {
	var options = {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<scripts>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};

	return gulp.src('./dist/Viewsbak/**/*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('./dist/Views/'));
});

gulp.task('admin-min', function() {
	var options = {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<scripts>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};

	return gulp.src('./dist/adminbak/**/*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('./dist/admin/'));
});

gulp.task('interface-min', function() {
	var options = {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<scripts>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};
	return gulp.src(['./dist/interfacebak/*.html','./dist/interfacebak/*.php'])
//		.pipe(htmlmin(options))
		.pipe(gulp.dest('./dist/interface/'));
});

gulp.task('bak-clean', function() {
	gulp.src(['./dist/Viewsbak'], {
			read: false
		})
		.pipe(clean());
});

gulp.task('rev-clean', function() {
	return gulp.src(['./rev'], {
			read: false
		})
		.pipe(clean());
});

gulp.task('watch-plugins', function() {
	gulp.watch('./Js/plugins/*.js', ['plugins-min']);
});

gulp.task('watch-css', function() {
	gulp.watch('./css/styles/*.css', ['styles-min']);
});

gulp.task('watch-component', function() {
	gulp.watch('./Js/component/*.js', ['component-min']);
})

gulp.task('watch-lib', function() {
	gulp.watch('./Js/lib/*.js', ['lib-min']);
})

gulp.task('default', function(cb) {
	runSequence(
		'clean', // 第一步：清理目标目录
		['common-min', 'component-min', 'styles-min', 'plugins-min', 'barcode-min'], // 第二步：合并
		'watch-plugins',
		'watch-css',
		'watch-component',
		cb
	);
});

gulp.task('web', function(cb) {
	runSequence(
		'clean', // 第一步：清理目标目录
		['common-min', 'component-min', 'styles-min', 'plugins-min', 'barcode-min'], // 第二步：合并
		'copy-file', 
		['ver-js', 'ver-biz-js', 'ver-css'], //压缩加版本号
		['rev-html', 'rev-index'], //修改路径
		['web-min'], //HTML压缩
		'bak-clean', //清理BAK目录
		'rev-clean',
		cb
	);
});
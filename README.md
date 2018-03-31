# 前端架构师启蒙课第一讲（1）

[TOC]

## 文件夹介绍

> 文件夹禁止使用大小写，全部使用小写
> 文件夹的名称也应全部用小写字母。关键是保持一致。
> 如果使用小写字母,访问者和创建者就不必在大写字母和小写字母之间转换浪费时间了。

* build：上线的文件夹；上线的阶段的代码，通过动态编译而来；build不是你写的，是程序生成的，所有人都在为build服务
* config项目编译的配置文件
* docs是项目文档文件夹
* src：是开发文件夹=>东西不参与上线
* tests是测试文件夹

### src

> 外面的config是webpack的配置，里面的是node的开发配置
> 编写node需要有启动文件，`app.js`为node的启动文件
> 文件夹全部用小写

* nodeuii
    * assets静态资源文件夹
    * config后台配置文件夹
    * controllers路由文件夹
    * middlewares中间件文件夹
    * models模型文件夹
    * views视图文件夹
    * widgets组件文件夹
    * `app.js`启动文件
* webapp

### widgets

* 里面包含`html`、`css`、`js`

#### assets静态资源文件夹

> Yii中的资源是和Web页面相关的文件，可为CSS文件，JavaScript文件，图片或视频等，资源放在Web可访问的目录下，直接被Web服务器调用。
> 资源包简单的说就是放在一个目录下的资源集合， 当在视图中注册一个资源包， 在渲染Web页面时会包含包中的CSS和JavaScript文件。

#### config后台配置文件夹

#### controllers路由文件夹

> 控制器是 MVC 模式中的一部分， 是继承yii\base\Controller类的对象，负责处理请求和生成响应。 具体来说，控制器从应用主体接管控制后会分析请求数据并传送到模型，传送模型结果到视图，最后生成输出响应信息。

#### middewares中间件

* 中间件是一种独立的系统软件或服务程序，分布式应用软件借助这种软件在不同的技术之间共享资源。中间件位于客户机/ 服务器的操作系统之上，管理计算机资源和网络通讯。是连接两个独立应用程序或独立系统的软件。相连接的系统，即使它们具有不同的接口，但通过中间件相互之间仍能交换信息。执行中间件的一个关键途径是信息传递。通过中间件，应用程序可以工作于多平台或OS环境。

#### models模型

* 模型是 `MVC` 模式中的一部分， 是代表业务数据、规则和逻辑的对象。

#### views视图

* 视图部分，模板语言，组件 `view` 就是用于渲染视图的

#### widgets

* 启动views
* widgets里面是一个个组件，一个文件夹一个组件，一个组件里面有`.html`、`.css`和`.js`

### gulpfile.js

* 用gulp编译node
* 原因：简单！！比webpack快
* 已经发展完善了，停止更新了，停止维护

**--save and --save-dev**

* `--save`：是上线所需要的文件
* `--save-dev`：是开发时候所需要的文件

> `npm install koa --save`

*开发的src写es6文件，上线的这个配置文件，不支持的语法就不要写了*
*`**`是左右文件夹，`*`是所有文件*
*编译node直接用`babel-plugin-transform-es2015-modules-commonjs`*

## npm run?

* 问题：有时需要`npm xxx`，有时需要`npm run xxx`
* 解答：npm自带的关键字，可以直接使用`npm xxx`；不是关键字的，只能`npm run xxx`

## supervisor可以实现零秒热启动

* 启动的是build中的文件

## 使用package.json把环境变量，传进去

* `NODE_ENV=development`
* 在windows和linux下，设置环境变量是不一样的
* 使用`cross-env`解决

## cross-env

* cross-env能跨平台地设置及使用环境变量
* 上线环境所需要`npm install --save cross-env`
 
```
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

## node不用压缩

* 因为node运行在服务器端，消耗的是cpu和内存
* 而前端网页消耗的是带宽，才有压缩一说

## gulp系列

> gulp用来编译node，所以只要编译js就行了
> 这里只使用支持的es6语法，不支持的不必用，还得编译，太麻烦了
> gulp只负责编译node，不处理静态资源，把src送到build里面，就完活

**gulp-babel**

> 程序默认找寻外面的`.babelrc`进行编译
> `.babelrc` and `gulp-babel`只能使用一个

* es6转es5
* 和外界的`.babelrc`起冲突，项目中没有指定的时候，默认使用`.babelrc`文件进行编译
* 因为使用了`gulp-babel`，所以需要停掉外面的`.babelrc`；目前只知道两者互相影响
* `**`为所有文件夹，`*`是所有文件

```
gulp.task('default', () => {
    return watch('./src/nodeuii/**/*.js', {
        // 避免初始化的时候，触发其他模块
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                //不让外部的.babelrc印象内部
                babelrc: false,
                // 不转换成amd模块，import在node中V8引擎不支持
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});
```

*transform-es2015-modules-commonjs*

* 项目系统需要将es6模块转成AMD模块
* 之所以要转换，是因为node使用amd模块
* 具体见下图

![前端模块市场](http://p1fg8xetu.bkt.clouddn.com/module.jpg)

**gulp-concat**

* 合并文件夹

## 到这里出现了一个问题，就是多了很多不必要的代码

* 即：各种判断的代码，这种代码应该被去掉
* 使用`tree-shaking`来减少不必要的代码，排除任何未实际使用的代码，生成地复杂度的library(库)
* rollup本身能够编译es6

## 报错集合

### `Error: Cannot find module '.../app.js'`

* 不能找到指定的`app.js`模块

## node日志管理

> 不进行日志捕获，导致网络各种错误捕获不到

* 使用`log4js`模块进行日志记录管理


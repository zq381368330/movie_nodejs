# Change Log
# 项目主要功能介绍

主要是：展示所有电影的主页index，
点击主页中一部电影可以查看器详细内容detail，
还有一个录入电影相关信息的界面admin，
以及电影列表页list，
可以对电影进行删除、修改等操作。
还有注册登录，管理用户，评论与回复的功能
# 搭建环境
```
```javascript
使用node的npm工具进行安装前后端需要使用到的框架或类，搭建电影网站需要用到的框架如下：
        后端：（使用npm安装）
        Mongoose：对MongoDB进行快速建模的工具
        MongoDB：Nosql数据库
        Jade：客户端的模板引擎
        Moment.js:日期格式化
        前端：（npm安装Bower，Bower安装其他前端库）
                jQuery类库
               Bootstrap框架
        具体操作：首先进入到新建项目的根目录下，然后利用npm进行安装
        npm  install express //后台框架会使用
        npm install body-parser //新版的express没有自带，用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
        npm  install jade  //模板引擎的使用
        npm install underscore //Underscore封装了常用的JavaScript对象操作方法，用于提高开发效率
        npm  install mongoose
        npm  install bower -g
# 项目后端搭建:
使用NodeJs的express框架完成电影网站后端搭建;
使用mongodb完成数据存储,通过mongoose模块完成对mongodb数据的构建;
使用jade模板引擎完成页面创建渲染;
使用Moment.js格式化电影存储时间;
# 项目前端搭建:
使用jQuery和Bootsrap完成网站前端JS脚本和样式处理;
前后端的数据请求交互通过Ajax完成
# 运行项目
clone项目到本地，进入项目文件夹，安装依赖
```javascript
git clone https://github.com/zq381368330/movie_nodejs.git
cd movie_nodejs
npm install
node app.js
```

最后打开浏览器，输入`localhost:3000`即可访问。效果图如下：

![text](https://raw.githubusercontent.com/zq381368330/MarkdownPhotos/master/index.png)



# 路由
路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback…], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。
路由方法 
Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。


# 项目结构
```javascript
.
├── README.md
├── config // 路由
│   └── route.js
├── .bowerrc//指定bower(Bootstrap和jquery)安装到哪个目录下
├── public  // 静态文件
│   ├──  build
│   └── js
│   └── libs
├── package.json
├── app
│   ├── views//视图
│   │   ├── includes.js
│   │   ├── pages.js
│   │   ├── layout.jade
│   ├── schemas//数据库文档模型
│   │   ├── category.js
│   │   ├── comment.js
│   │   └── movie.js
│   │   └── user.js
│   ├── controllers//负责数据逻辑处理
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── index.js
│   │   └── movie.js
│   │   └── user.js
│   ├── models//连接数据库，导入schemas模块，导出Movie模块，供外部使用(供controler使用)
│   │   ├──category.js
│   │   ├── comment.js
│   │   └── movie.js
│   │   └──  user.js
├── _config.ymml
└── app.js//入口文件
└── gruntfile.js//项目构建工具
```



# 豆瓣API
该应用使用了如下api：
'https://api.douban.com/v2/movie/subject/'+id

>更多关于豆瓣的api可以前往[豆瓣api官网](https://developers.douban.com/wiki/?title=guide)查看。

```javascript

```
# express使用

```
var express = require('express')
var app = express()
```

# mongoose
```
1引入mongoose这个插件
Mongoose是MongoDB的一个对象模型工具，可以工作于异步环境下。
定义一个模型很容易：
var Comments = new Schema({
    title     : String
  , body      : String
  , date      : Date});var BlogPost = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
  , comments  : [Comments]
  , meta      : {
        votes : Number
      , favs  : Number
}});mongoose.model('BlogPost', BlogPost);
Mongoose在与数据库真正建立连接之前便缓存了所有的命令，这就意味着你在定义模型、执行查询时不必非要确认与MongoDB数据库的连接是否已经建立。（一回@CSSer注：异步是MongoDB等与传统数据库的重大区别

MongoDB 是文档型数据库(Document Database)，不是关系型数据库(Relational Database)。而Mongoose可以将 MongonDB 数据库存储的文档(documents)转化为 javascript 对象，然后可以直接进行数据的增删改查。
因为MongoDB是文档型数据库，所以它没有关系型数据库[joins](http://zh.wikipedia.org/wiki/%E8%BF%9E%E6%8E%A5_(SQL)(数据库的两张表通过"外键"，建立连接关系。) 特性。也就是在建立数据的关联时会比较麻烦。为了解决这个问题，Mongoose封装了一个Population功能。使用Population可以实现在一个 document 中填充其他 collection(s) 的 document(s)。
在定义Schema的时候，如果设置某个 field 关联另一个Schema，那么在获取 document 的时候就可以使用 Population 功能通过关联Schema的 field 找到关联的另一个 document，并且用被关联 document 的内容替换掉原来关联字段(field)的内容。
如下图
![text]()
所以Category的movies属性关联Movie
![text]()
```
# 项目展示

```
首页

![text]()
```






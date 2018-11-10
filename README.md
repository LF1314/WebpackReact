
### 使用webpack4.0 从零到搭建react 开发配置环境
>开始前需要全局安装 webpack
  webpack 4.0 以后版本安装

  ```
  npm i webpack -g 
  //安装后直接运行 webpack -v 版本号是出不来的 需要
  //安装 
 npm i webpack-cli -g
 //在运行 webpack -v 即可看到版本号
 更新后的 webpack 坑还是比较多的 
  ```


1.第一步 初始化一个项目
```
npm init

```
2.第二部 安装 webpack4.0
webpack 除了要安装 webpack 以外 还需要安装 webpack-cli
 
 ```
npm i webpack webpack-cli -D
 ```

 3.webpack是基于nodejs的，所以需要新建个webpack.config.js的文件来进行修改webpack的配置项
 ```
 module.exports ={
    entry:'',// 入口文件
    output:{},//出口文件
    module:{},//处理对应的模块
    plugins:[],//对应的插件
    devServer:{},//开发服务器配置
    mode:'development' //模式配置

}
 ```
 4.接下来是安装 webpack-dev-server
  是为了启动 DevSever

  ```
  npm i webpack-dev-server -D
  ```
  5.接下来是配置 webpack.config.js 文件
  ```
      entry:'./src/index.js',// 入口文件
    output:{
       filename:'bundle.js',//打包后的文件名
       path: path.resolve('dist')
    },
  ```
  6.一个简单的webpack就完成了 接下来是直接运行

    webpack //前提 全局安装了webpack
  如下图说明打包成功
  ![](https://img.mukewang.com/5be634ea0001c73205940228.png)

   运行完毕后你会发现 根目录下多了个dist文件

![](https://img.mukewang.com/5be634fe000127da02810328.png)

#### 配置执行文件

 >在react 脚手架中打包 一个项目 npm run build ,运行一个项目使用npm run dev
 
 接下来 就来配置package.json

 ```
 "scripts": {
    "build":"webpack",
    "dev" : "webpack-dev-server"
  }
 ```
运行npm run buid 打包生成我们上线后所依赖的包，运行后会生成dist文件夹

运行 npm run dev 是在开发环境中webpack-dev-server,帮我们把包丢到内存中去

#### 配置html模块 

虽然dist 文件打包好了但是我们缺一个html文件 我们不可能在dist问价夹下直接新建一个index.html,然后去引用打包好的js文件这样做肯定是不合理的，这时候就需要用到我们经常回用到的一个插件，来帮我们打包html文件 html-webpack-plugin 一样的套路用前先来安装


```
npm i html-webpack-plugin -D
```
然后在webpack.config.js中 plugin 添加配置
```
   plugins:[
        //使用插件就需要new
        new HtmlWebpackPlugin({
            //使用那个html当作模板 在src下新建
            //一个index.html 当作模板
            template:'./src /index.html',
            hash:true
            //使用hash会在每个bundle.js后面加入hash串，
            //有效的避免文件的缓存
        })

    ]
```
最后 再来运行下npm run build 看下打包后的文件变成什么样

![](https://img.mukewang.com/5be6427c0001b2f604010132.png)

此时会发现dist目录下多了一个index.html文件

这是简单的一个页面 那如何实现多个页面呢，，

 html-webpack-plugin 给我们提供了这样的方法

 ```
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index'],//对应关系index.html 对应 index.js
        }),
        new HtmlWebpackPlugin({
            template:'./src/home.html',
            filename:'home.html',
            chunks:['home'],//对应关系home.html 对应 home.js
        })
 ```
npm run build 会生成以下的目录 其中bundle.js 是上次生成的
我们还没有配置 每次run build 的时候去清空 dist目录下的文件 后面会一一讲解

![](https://img.mukewang.com/5be6486f0001dc2503470262.png)
打开文件你会发现 对应的 home.html 引用的home.js
index.html 引用的是index.js  
以上就是 webpack 打包js 以及 html

#### webpack 处理css的引用

开始之前我们需要 下载一些解析css样式的loader

```
npm i style-loader css-loader -D //css样式以及style

npm i less less-loader -D //引用less开发的时候

npm i node-sass sass-loader -D // 使用sass开发的时候

```


```
//index.js
import './sass/styles.sass'
import './css/styles.css'
import './less/styles.less'

console.log('....')

//webpack_config.js
    module:{
         rules:
         [
             {
                test:'/\.css$/',
                use:['style-loader','css-loader'],
                //配置规则，这两种写法都可以，下面这种可以添加
                //其他的配置
                // use:[
                //     {loader:'style-loader'},
                //     {loader:'css-loader'}
                // ]
                  
                
             }
         ]
```
>如果使用上面的这种方式去解析css css的样式是以行内样式的形式写入的
如果有多个css文件这时候我们希望使用link标签引入这时候就需要我们经常用到的extract-text-webpack-plugin插件它的功效就在于会将打包到js里的css文件进行一个拆分,单独提取css

#### 拆分css

// @next表示可以支持webpack4版本的插件
```
npm i extract-text-webpack-plugin@next -D

```




























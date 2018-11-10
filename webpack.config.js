
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={
    entry:{
        index:'./src/index.js',
        // home:'./src/home.js'
    },// 入口文件

    output:{
         filename:'bundle..js',
      //    filename:'[name].js',//打包后的文件名
       path: path.resolve('dist')
    },//出口文件
    module:{
         rules:
         [
             {
                test:'/\.css$/',
                use:['style-loader','css-loader'],
                // use:[
                //     {loader:'style-loader'},
                //     {loader:'css-loader'}
                // ]
                  
                
             }
         ]



    },//处理对应的模块
    plugins:[
        //使用插件就需要new
        // new HtmlWebpackPlugin({
        //     template:'./src/index.html',
        //     filename:'index.html',
        //     chunks:['index'],//对应关系index.html 对应 index.js
        // }),
        // new HtmlWebpackPlugin({
        //     template:'./src/home.html',
        //     filename:'home.html',
        //     chunks:['home'],//对应关系home.html 对应 home.js
        // })

    ],//对应的插件
    devServer:{},//开发服务器配置
    mode:'development' //模式配置

}















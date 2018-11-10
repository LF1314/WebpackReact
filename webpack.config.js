
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports ={
    entry:{
        index:'./src/index.js',
        // home:'./src/home.js'
    },// 入口文件

    output:{
         filename:'bundle.js',
      //    filename:'[name].js',//打包后的文件名
       path: path.resolve('dist')
    },//出口文件
    module:{
         rules:[
            {
           test:'/\.less$/',
           use:ExtractTextWebpackPlugin.extract({
               //将css以link标签的方式引入就不再需要，style-loader
                fallback:"style-loader",
                use:['css-loader','less-loader']
           })
            },
           {
            test:'/\.sass$/',
            use:ExtractTextWebpackPlugin.extract({
                //将css以link标签的方式引入就不再需要，style-loader
                    fallback:"style-loader",
                    use:['css-loader','sass-loader']
            })
            },
            {
            test:'/\.css$/',
            use:ExtractTextWebpackPlugin.extract({
                //将css以link标签的方式引入就不再需要，style-loader
                    fallback:"style-loader",
                    use:['css-loader']
            })
                }
         ]



    },//处理对应的模块
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'  
        }),
        new ExtractTextWebpackPlugin('css/styles.css')      
    ],//对应的插件
    devServer:{},//开发服务器配置
    mode:'development' //模式配置

}















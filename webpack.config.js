const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    // 输入文件
    entry: {
        index: './src/js/index.js',
        api: './src/js/api.js',
        cart: './src/js/cart.js',
        cell: './src/js/cell.js'
    },
    // 输出文件
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    // 加载器
    module: {
        rules: [
            // babel-loader
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // css-loader style-loader
            // {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.css$/, use: [CssExtractPlugin.loader, 'css-loader']},
            // url-loader
            {
                test: /\.(jpe?g|gif|bmp|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30*1024,
                    }
                }
            }
        ]
    },
    // 插件
    plugins: [
        // 自动创建一个html文件(默认为index.html)，并且通过script标签引入打包后的js文件
        // new HtmlWebpackPlugin()

        // 以tempalte 为模板创建一个html文件，并且在body中通过script标签引入打包后的js文件
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 按照这个源文件模板，然后在dist目录下创建一个html文件。
            filename: 'index.html', //默认生成index.html文件的名称,但可以自定义
            favicon: './src/assets/logo.ico',  // 小图标
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/cell.html',  // 按照这个源文件模板，然后在dist目录下创建一个html文件。
            filename: 'cell.html', //默认生成index.html文件的名称,但可以自定义
            favicon: './src/assets/logo.ico',  // 小图标
            chunks: ['cell']
        }),
        new HtmlWebpackPlugin({
            template: './src/cart.html',  // 按照这个源文件模板，然后在dist目录下创建一个html文件。
            filename: 'cart.html', //默认生成index.html文件的名称,但可以自定义
            favicon: './src/assets/logo.ico',  // 小图标
            chunks: ['cart']
        }),
        new CssExtractPlugin({
            filename: '[name].css' // 生成一个main.css文件，也可以自定义
        }), 
        new CopyPlugin([     //复制插件
            // {from: './src/assets', to: 'assets'},  // 将源文件下整个assets文件夹复制到dist目录下，名字也叫assets
            {from: './src/images', to: 'images'},  // 如果to后面为空，即默认复制在dist目录下，加了信息，则复制在dist/public
            {from: './src/data', to: 'data'},  // 如果to后面为空，即默认复制在dist目录下，加了信息，则复制在dist/public
            {from: './public', to: 'public'}
        ])  
    ],
    devServer: {  //打包放在电脑内存，没有放在磁盘，即不在磁盘生成dist
        port: 8080,
        open: true //自动打开浏览器
    }
}
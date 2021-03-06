var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "index": __dirname + "/src/index.js"/*,
        "vendor":["jquery"]*/
    },
    output: {
        path:path.join(__dirname , "/dist/") ,
        publicPath:"/dist/",
        filename: "js/[name].bundle.js"
    },
    resolve: {
         alias: {
            vue: "vue/dist/vue.js",
            root: path.join(__dirname, "/src/"),
            cssfiles: path.join(__dirname, '/src/css/'),
            imgfiles: path.join(__dirname, '/static/images/'),
            components: path.join(__dirname, '/src/html/components/'),
            widget: path.join(__dirname, '/src/html/components/widget/'),
            pubwidget: path.join(__dirname, '/src/widget/'),
            frame: path.join(__dirname, '/src/html/components/frame/'),
            store: path.join(__dirname, '/src/store/'),
            lib: path.join(__dirname, '/lib/')
        }
    },
    externals: {

    },
   module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.vue?$/,
            loader: 'vue-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            //loader: 'style-loader!css-loader!less-loader',
            use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ['css-loader', 'less-loader']
                }),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            //loader: 'style-loader!css-loader',
            use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                }),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            exclude: /node_modules/,
            query: {
                limit: 8192,
                name:'images/[hash].[ext]'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/index.html', //目标文件
            template: __dirname + '/src/html/index.html', //模板文件
            inject: 'body',
            hash: true, //代表js文件后面会跟一个随机字符串,解决缓存问题
            chunks: ["index"]
            //chunks: ["index","vendor"]
        }),
        /*new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),*/
        new webpack.optimize.UglifyJsPlugin({
	      output: {
	        comments: false,
	      },
	      compress: {
	        warnings: false,
            drop_debugger: true,
            drop_console: true
	      },
          except:['$','require']
	    }),
        new ExtractTextPlugin("css/css.css"),
        new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery"
        })/*,
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:"vendor.jquery.js"
        })*/
    ]
}
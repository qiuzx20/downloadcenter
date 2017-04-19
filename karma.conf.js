// Karma configuration
// Generated on Sun Jan 08 2017 16:10:08 GMT+0800 (CST)

var webpack = require("webpack");
var path = require("path");

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'test/unit/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/unit/**/*.spec.js': ['webpack']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // webpack配置
        webpack: {
            resolve: {
                alias: {
                    root: path.join(__dirname, "/src/"),
                    cssfiles: path.join(__dirname, '/src/css/'),
                    imgfiles: path.join(__dirname, '/static/images/'),
                    components: path.join(__dirname, '/src/html/components/'),
                    widget: path.join(__dirname, '/src/html/components/widget/'),
                    pubwidget: path.join(__dirname, '/src/widget/'),
                    frame: path.join(__dirname, '/src/html/components/frame/'),
                    store: path.join(__dirname, '/src/store/'),
                    lib: path.join(__dirname, '/lib/'),
                    'jquery': 'jquery'
                }
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }, {
                    test: /\.vue$/,
                    loader: 'vue-loader'，
                    exclude: /node_modules/
                }, {
                    test: /\.less$/,
                    loader: 'style-loader!css-loader!less-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader',
                    exclude: /node_modules/
                }]
            }
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        webpackServer: {
            noInfo: true // prevent console spamming when running in Karma!
        }
    })
}
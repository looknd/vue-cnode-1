'use strict'

var path = require('path'),
	webpack = require('webpack'),
	ExtractText = require('extract-text-webpack-plugin');

var cdn = '',
	buildPath = '/dist'


module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: path.join(__dirname, buildPath),
		filename: 'build.js',
		publicPath: path.join(cdn, buildPath)
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue',
		}, {
			test: /\.css$/,
			loader: ExtractText.extract('style', ['css?sourceMap', 'postcss'])
		}, {
			test: /\.scss$/,
			loader: ExtractText.extract('style', ['css?sourceMap', 'sass', 'postcss'])
		}, {
			test: /\.js$/,
			exclude: /node_modules|dist/,
			loader: 'babel'
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: 'file?name=images/[hash].[ext]'
		}, {
			test: /\.(eot|ttf|woff(2)?|svg)(\?[a-z0-9]+)?$/,
			loader: 'url?limit=10000&minetype=application/font-woff'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	vue: {
		loaders: {
			css: ExtractText.extract('css'),
		}
	},

	//配置插件的插件
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	postcss: function() {
		return [require('autoprefixer')];
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractText('style.css', {
			allChunks: true,
			disable: false
		}),
		new webpack.ProvidePlugin({
			$: 'webpack-zepto'
		}),
		new webpack.DefinePlugin({
			ERRORIMG: JSON.stringify('http://img4.imgtn.bdimg.com/it/u=2941524455,810842393&fm=206&gp=0.jpg'),
			LIST: JSON.stringify('https://cnodejs.org/api/v1/topics'),
			TOPIC: JSON.stringify('https://cnodejs.org/api/v1/topic'),
			AT: JSON.stringify('https://cnodejs.org/api/v1/accesstoken'),
			TAB: JSON.stringify(['all', 'good', 'share', 'ask', 'job']),
		})
	],
	resolve: {
		extension: ['', '.js'],

		// 设置别名, 必须用绝对路径, 最好是用path.join
		alias: {
			store: path.join(__dirname, './src/js/store'),
		}
	},
	// devtool: '#source-map'
};






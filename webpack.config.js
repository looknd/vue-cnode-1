'use strict'

let path = require('path'),
		webpack = require('webpack'),
		ExtractText = require('extract-text-webpack-plugin'),
		HTMLWebpack = require('html-webpack-plugin'),
		Clean = require('clean-webpack-plugin'),
		Copy = require('copy-webpack-plugin')

let target = process.env.TARGET;
let dev = target === 'dev';
let pro = target === 'production';

let apiBase = 'https://cnodejs.org/api/v1/';

let plugins = [
		new Copy([{
			from: 'src/asset/img/*'
		}]),
		new Clean(['dist']),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractText('style.css'),
		new HTMLWebpack({
			filename: 'index.html',
			template: './index.ejs',
			hash: true,
			title: 'CNode社区',
			inject: 'body',
			minify: {
				removeComments:     pro,
				collapseWhitespace: pro
			}
		}),
		new webpack.ProvidePlugin({
			$: 'webpack-zepto'
		}),
		new webpack.DefinePlugin({
			ERRORIMG: JSON.stringify('http://img4.imgtn.bdimg.com/it/u=2941524455,810842393&fm=206&gp=0.jpg'),
			LIST:     JSON.stringify(apiBase + 'topics'),
			NEW:      JSON.stringify(apiBase + 'topocs'),
			TOPIC:    JSON.stringify(apiBase + 'topic'),
			AT:       JSON.stringify(apiBase + 'accesstoken'),
			USER:     JSON.stringify(apiBase + 'user'),
			MSG:      JSON.stringify(apiBase + 'messages'),
			TAB:      JSON.stringify(['all', 'good', 'share', 'ask', 'job']),
		})
	]

if(pro) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	)
}

module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'dist'),   //打包输出路径
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue',
		}, {
			test: /\.css$/,
			loader: ExtractText.extract('css?sourceMap!postcss')
		}, {
			test: /\.scss$/,
			loader: ExtractText.extract('css?sourceMap!postcss!sass')
		}, {
			test: /\.js$/,
			exclude: /node_modules|dist/,
			loader: 'babel'
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: 'url?limit=30000&minetype=image/jpeg'
			// loader: 'file?name=images/[hash].[ext]'
		}, {
			test: /\.(eot|ttf|woff(2)?|svg)(\?[a-z0-9]+)?$/,
			loader: 'url?limit=100000&minetype=application/font-woff'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	vue: {
		// loaders: {
		//  css: ExtractText.extract('css'),
		// }
	},

	devServer: {
		host: '0.0.0.0',
		port: 8888,
		contentBase: path.join(__dirname, 'src')
	},

	postcss: function() {
		return [require('autoprefixer')];
	},

	plugins: plugins,

	resolve: {
		extension: ['', '.js'],

		// 设置别名, 必须用绝对路径, 最好是用path.join
		alias: {
			store: path.join(__dirname, './src/js/store'),
		}
	},
	// devtool: '#source-map'
};






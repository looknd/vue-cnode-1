'use strict'

var path = require('path'),
	webpack = require('webpack'),
	ExtractText = require('extract-text-webpack-plugin');

var cdn = '',
	buildPath = '/dist',
	publicPath = path.join(cdn, buildPath);


module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: path.join(__dirname, buildPath),
		filename: 'build.js',
		publicPath: publicPath
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue',
		}, {
			test: /\.css$/,
			loader: ExtractText.extract('style', ['css?sourceMap', 'cssnext'])
		}, {
			test: /\.less$/,
			loader: ExtractText.extract('style', ['css?sourceMap', 'less', 'cssnext'])
		}, {
			test: /\.js$/,
			exclude: /node_modules|dist/,
			loader: 'babel'
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: 'file?name=images/[hash].[ext]'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	babel: {
		presets: ['es2015', 'stage-0'],
		plugins: ['transform-runtime']
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractText('style.css', {
			allChunks: true,
			disable: false
		})
	],
	// resolve: {
	// 	extension: ['', '.js']
	// },
	devtool: '#source-map'
};






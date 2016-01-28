'use strict'

var webpack = require('webpack'),
	DevServer = require('webpack-dev-server'),
	config = require('./webpack.config')

config.entry.unshift('webpack-dev-server/client?http://localhost:8090', 'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

new DevServer(webpack(config), {
	publicPath: config.outputPath,
	hot: true,
	historyApiFallback: true,
	proxy: [{
		path: '/api/*',
		target: 'https://cnodejs.org',
		host: 'cnodejs.org'
	}]
})
.listen(9000);
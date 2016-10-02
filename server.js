'use strict'

var path 		= 	require('path'),
		webpack = 	require('webpack'),
		WDS 		= 	require('webpack-dev-server'),
		config 	= 	require('./webpack.config.js');


config.entry.unshift('webpack-dev-server/client', 'webpack/hot/dev-server');

var server = new WDS( webpack(config) )


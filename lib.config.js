var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

// var nodeModules = {};
// fs.readdirSync('node_modules')
// .filter(function(x) {
// 	return ['.bin'].indexOf(x) === -1;
// })
// .forEach(function(mod) {
// 	nodeModules[mod] = 'commonjs ' + mod;
// });
var cfg = {
	module: {
		loaders: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.glsl$/, use: "glsl-template-loader" },
			{ test: /\.(xml|html|txt|md)$/, loader: "raw-loader" },
			{ test: /\.(less)$/, use: ['style-loader','css-loader','less-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		main: "./source/preact-repo-card.coffee",
	},
	// externals: nodeModules,
	output: {
		filename: "build/index.js",
		library: 'PreactRepoCard',
		libraryTarget: 'umd'
	}
}
module.exports = cfg;
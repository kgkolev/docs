const ILibPlugin = require('ilib-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
	const {createNodeField} = boundActionCreators;
	let slug;
	if (node.internal.type === 'MarkdownRemark') {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);
		if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === '') {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		// Add slug as a field on the node.
		createNodeField({node, name: 'slug', value: slug});
	}
};

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators;

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve('src/templates/blog-post.js');
		// Query for all markdown "nodes" and for the slug we previously created.
		resolve(
			graphql(
				`
					{
						allMarkdownRemark {
							edges {
								node {
									fields {
										slug
									}
								}
							}
						}
					}
				`
			).then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				// Create blog posts pages.
				result.data.allMarkdownRemark.edges.forEach(edge => {
					createPage({
						path: edge.node.fields.slug, // required
						component: blogPost,
						context: {
							slug: edge.node.fields.slug
						}
					});
				});
			})
		);
	});
};

exports.modifyWebpackConfig = function (config, stage) {
	const cssModulesConf = 'css?modules&minimize&importLoaders=1';
	const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`;

	config.loader('js', cfg => {
		cfg.exclude = /(node_modules.(?!@enact)|bower_components)/;
		return cfg;
	});
	config.loader('css', cfg => {
		cfg.exclude = /(enact\/.*|\.module)\.css$/;
		return cfg;
	});
	config.loader('less', cfg => {
		cfg.exclude = /(enact\/.*|\.module)\.less$/;
		if (stage === 'develop') {
			cfg.loaders = ['style', cssModulesConfDev, 'less'];
		} else {
			cfg.loader = ExtractTextPlugin.extract('style',
				'css?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]---[hash:base64:5]!postcss!less');
		}
		return cfg;
	});
	config.loader('enact-css', function (cfg) {
		cfg.test = /enact\/.*\.(c|le)ss$/;
		if (stage === 'develop') {
			cfg.loaders = ['style', cssModulesConfDev, 'less'];
		} else {
			cfg.loader = ExtractTextPlugin.extract('style',
				'css?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]---[hash:base64:5]!postcss!less');
		}
		return cfg;
	});
	config.merge({
		postcss: function () {
			return [
				autoprefixer({
					browsers: [
						'>1%',
						'last 4 versions',
						'Firefox ESR',
						'not ie < 9' // React doesn't support IE8 anyway
					]}
				)
			];
		}
	});
	config.plugin('ilib', ILibPlugin);
	config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/));

	return config;
};

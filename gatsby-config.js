module.exports = {
	siteMetadata: {
		title: 'Enact',
		baseColor: '#1b5271',
		docPages: [
			'/docs/',
			'/docs/modules/',
			'/docs/developer-guide/',
			'/docs/developer-tools/',
			'/docs/tutorials/'
		],
		linkPrefix: '/public'
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: '${__dirname}/src/pages/'
			}
		},
		'gatsby-transformer-json',
		'gatsby-transformer-remark'
	]
};

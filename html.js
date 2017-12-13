import React from 'react'
import DocumentTitle from 'react-document-title'

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './utils/typography'
import { colors } from 'utils/colors'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
	displayName: 'HTML',
	propTypes: {
		body: React.PropTypes.string,
	},
	render () {
		const title = DocumentTitle.rewind()

		let css
		if (process.env.NODE_ENV === 'production') {
			css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
		}

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<title>{title}</title>
					<TypographyStyle typography={typography} />
					<GoogleFont typography={typography} />
					{css}
					{this.props.headComponents}
				</head>
				<body>
					<div id="___gatsby" dangerouslySetInnerHTML={{__html: this.props.postBodyComponents}} />
					{this.props.postBodyComponents}
				</body>
			</html>
		)
	},
})

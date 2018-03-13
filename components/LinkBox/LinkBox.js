// Type
//
import React from 'react';
// import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import {Cell, Column, Row} from '@enact/ui/Layout';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';

import css from './LinkBox.less';

const LinkBox = kind({
	name: 'LinkBox',
	propTypes: {
		children: React.PropTypes.node,
		childLayout: React.PropTypes.oneOf(['column', 'row']),
		iconAlt: React.PropTypes.string,
		iconSrc: React.PropTypes.string,
		title: React.PropTypes.string
	},
	styles: {
		css,
		className: 'linkBox'
	},
	defaultProps: {
		childLayout: Row
	},
	computed: {
		ChildLayout: ({childLayout}) => {
			if (childLayout === 'column') {
				return Column;
			}
			return Row;
		}
	},
	render: ({ChildLayout, children, iconAlt, iconSrc, title, ...rest}) => (
		<Row align="center" component="section" {...rest}>
			<Cell size={210} className={css.image} shrink>
				<img alt={iconAlt} src={iconSrc} /><br />
				{title}
			</Cell>
			<Cell>
				<ChildLayout wrap className={css.content}>
					{children}
				</ChildLayout>
			</Cell>
		</Row>
	)
});

const CellLink = kind({
	name: 'CellLink',
	propTypes: {
		children: React.PropTypes.string,
		to: React.PropTypes.string
	},
	styles: {
		css,
		className: 'cell'
	},
	render: ({to, children, ...rest}) => (
		<Cell size="50%" component={Link} to={to} {...rest}>{children}</Cell>
	)
});

export default LinkBox;
export {LinkBox, CellLink};

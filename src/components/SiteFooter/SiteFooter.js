// SiteFooter
//
import kind from '@enact/core/kind';
import Link from 'gatsby-link';
import {OutboundLink} from 'gatsby-plugin-google-analytics';
import React from 'react';
import {Row, Cell} from '@enact/ui/Layout';

import css from './SiteFooter.less';

const SiteFooterBase = kind({
	name: 'SiteFooter',

	styles: {
		css,
		className: 'footer'
	},

	render: ({...rest}) => {
		return (
			<footer {...rest}>
				<div className={css.frame}>
					<ul className={css.nav}>
						<li><Link to="/about/">About Us</Link></li>
						<li><Link to="/legal/">Legal</Link></li>
						<li><Link to="/contact/">Contact Us</Link></li>
					</ul>
					<Row>
						<Cell component="ul" className={css.social}>
							<li><OutboundLink href="https://twitter.com/EnactJS">Twitter</OutboundLink></li>
							<li><OutboundLink href="https://gitter.im/EnactJS/Lobby">Gitter</OutboundLink></li>
						</Cell>
						<Cell component="p" className={css.copy}>
							Copyright &copy; 2017-2018 LG Electronics
						</Cell>
					</Row>
				</div>
			</footer>
		);
	}
});

export default SiteFooterBase;
export {SiteFooterBase as SiteFooter, SiteFooterBase};

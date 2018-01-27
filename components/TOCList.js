// Table of Contents List
//
// TODO: We can use the metadata fields in the `.js` and `.md` files and pull them out of the
// `data` member of the page list.  We'll need to separate out the sections into an array of
// objects, sorted by the sort order.  Then, we can loop through and output them.  Given how
// different this is from the module list, we probably don't want to unify them at this time.
// However, we might could if we were to pass in the data instead of inferring from the route.

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';

import {linkIsLocation} from '../utils/paths.js';

import css from '../css/main.less';

export default class TOCList extends React.Component {

	static propTypes = {
		path: PropTypes.string,
		useFullModulePath: PropTypes.bool
	};

	static defaultProps = {
		useFullModulePath: false
	};

	static metadata () {
		return {
			title: 'Modules'
		};
	}

	render () {
		const {path: sourcePath, useFullModulePath, route, location, ...rest} = this.props;

		const componentDocs = route.pages.filter((page) =>
			page.path.includes(sourcePath));
		let lastLibrary;

		const path = location.pathname.replace(sourcePath, '').replace(/\/$/, '');
		const pathParts = path.split('/');  // This should really be appended with this: `.join('/' + <wbr />)`, but the string confuses JSX.

		return (
			<div className={css.modulesList + ' covertLinks'}>
				<section>
					<h2>Overview</h2>
				</section>
				{componentDocs.map((section, index) => {
					const linkText = section.path.replace(sourcePath, '').replace(/\/$/, '');
					const library = linkText.split('/')[0];
					const isActive = (pathParts[0] === library);
					if (library && library !== lastLibrary) {
						lastLibrary = library;
						return (
							<section key={index}>
								<h2 className={isActive ? css.active : null}><Link to={prefixLink(section.path)}>{section.data.title}</Link></h2>
								{(isActive) ? (
									<ul>{componentDocs.map((page, linkIndex) => {
										// Compartmentalize <li>s inside the parent UL
										const subLinkText = page.path.replace(sourcePath, '').replace(/\/$/, '');
										const [subLibrary, subDoc = subLibrary] = subLinkText.split('/');
										const isActivePage = linkIsLocation(page.path, location.pathname);
										if (subLibrary === library) {
											return (
												<li key={linkIndex} className={isActivePage ? css.active : null}>
													<Link to={prefixLink(page.path)}>{page.data.title}</Link>
												</li>
											);
										}
									})}</ul>) : null
								}
							</section>
						);
					}
				})}
			</div>
		);
	}
}

import React from 'react';
import ModulesList from '../../../components/ModulesList.js';
import DocumentTitle from 'react-document-title';
import {Link} from 'gatsby-link';
import {prefixLink} from 'gatsby-helpers';

import css from '../../../css/main.less';

export default class DocList extends React.Component {

	static metadata () {
		return {
			title: 'Modules'
		};
	}

	render () {
		return (
			<DocumentTitle title={`${DocList.metadata().title} | ${this.data.siteMetadata.title}`}>
				<article className={css.libraryList}>
					<h1>Modules by Library</h1>
					<ModulesList route={this.props.route} useFullModulePath />
				</article>
			</DocumentTitle>
		);
	}
}

// For reasons that I can't explain, using a const with this value and sharing with above does not work!
exports.data = {
	title: 'Modules'
};

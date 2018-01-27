import React from 'react';
import {linkIsLocation} from '../../../utils/paths.js';

import {Row, Cell} from '@enact/ui/Layout';
import TOCList from '../../../components/TOCList';

import css from '../../../css/main.less';

export default class TutorialsTemplate extends React.Component {
	static propTypes = {
		location: React.PropTypes.object,
		route: React.PropTypes.object
	}

	// contextTypes: {
	// 	router: React.PropTypes.object.isRequired,
	// }

	// handleTopicChange (e) {
	// 	return this.context.router.push(e.target.value);
	// }
	render () {
		// Let the docs home decide its own fate, and not use this pre-fab template
		if (linkIsLocation('/docs/', this.props.location.pathname)) {
			return this.props.children;
		}
		return (
			<Row className={css.multiColumn}>
				<Cell component="nav" size={198} className={css.sidebar}>
					<TOCList path="/docs/tutorials/" location={this.props.location} route={this.props.route} />
				</Cell>
				<Cell className={css.moduleBody}>
					{this.props.children}
				</Cell>
			</Row>
		);
	}
}

import React from 'react'
import DocumentTitle from 'react-document-title'

import css from '../css/main.less';

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  render () {
    const post = this.props.route.page.data

    return (
      <DocumentTitle title={`${post.title} | ${this.props.data.siteMetadata.title}`}>
        <div className={css.markdown}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </DocumentTitle>
    )
  },
})

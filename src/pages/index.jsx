import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"

import SEO from "../components/SEO/SEO"
import config from "../../data/SiteConfig"
import MainHeader from '../components/Layout/Header'
import CtaButton from '../components/CtaButton'

class Index extends React.Component {

	render() {
		const data = this.props.data;
		const postEdges = data.allContent ? data.allContent.edges : null;
		const indexContent = data.indexContent ? data.indexContent.edges[0].node : null;
		console.log('data', data);
		return (
			<div className="index-container">
				<Helmet title={config.siteTitle} />
				<SEO postEdges={postEdges} />
				<main>
					<MainHeader
						siteTitle={config.siteTitle}
						siteDescription={config.siteDescription}
						location={this.props.location}
						logo={config.siteLogo}
					/>
					<BodyContainer>
						<div dangerouslySetInnerHTML={{ __html: indexContent ? indexContent.html : null }} />
					</BodyContainer>
				</main>
			</div>
		);
	}
}

export default Index;

const BodyContainer = styled.div`
	padding: ${props => props.theme.sitePadding};
	max-width: ${props => props.theme.contentWidthLaptop};
	margin: 0 auto;
`


/* eslint no-undef: "off"*/
export const pageQuery = graphql`
	query IndexQuery {
		allContent: allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					fields {
						slug
					}
					excerpt
					timeToRead
					frontmatter {
						title
						tags
						cover
						date
					}
				}
			}
		}
		indexContent: allMarkdownRemark(
			filter: {fields: {slug: {eq: "/enact"}}}
		) {
			edges {
				node {
					html
				}
			}
		}
	}
`;

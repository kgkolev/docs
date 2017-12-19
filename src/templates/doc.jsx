import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components"

import UserInfo from "../components/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import SiteHeader from '../components/Layout/Header'
import TableOfContents from "../components/Layout/TableOfContents";

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.docBySlug;
    const post = postNode.frontmatter;

    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader location={this.props.location} />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              posts={this.props.data.allDocTitles.edges}
              contentsType="doc"
              chapterTitles={config.toDocChapters}
            />
          </ToCContainer>
          <BodyContainer>
            <h1>
              {post.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="post-meta">
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>
            <UserInfo config={config} />
            <Disqus postNode={postNode} />
          </BodyContainer>
        </BodyGrid>
      </div>
    );
  }
}

//need to export these to css
const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query DocPostBySlug($slug: String!) {
    allDocTitles: allMarkdownRemark{
        edges {
          node {
            frontmatter {
              title
              type
              section
            }
            fields {
              slug
            }
          }
        }
      }
      docBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
        section
      }
      fields {
        slug
      }
    }
  }
`;

import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const config = get(this, 'props.data.config')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const siteTitle = get(config, 'frontmatter.title')
    const description = get(config, 'frontmatter.description')
    const bio = get(config, 'html')

    return (
      <Layout location={this.props.location} config={config}>
        <Helmet
          htmlAttributes={{ lang: this.props.pageContext.language }}
          meta={[{ name: 'description', content: description }]}
          title={siteTitle}
        />
        <Bio>
          <div dangerouslySetInnerHTML={{ __html: bio }} />
        </Bio>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const blogIndexFragment = graphql`
  query BlogPost($language: String!) {
    config:markdownRemark(frontmatter: {
      language: { eq: $language }
      type: { eq: "language" }
    }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        language
        description
      }
    }
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: {
          language: { eq: $language }
          type: { eq: null }
        }}
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "LL")
            title
          }
        }
      }
    }
  }
`

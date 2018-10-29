import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import BlogIndex from '../../templates/blog-index'

class SpanishIndex extends React.Component {
  render() {
    const config = get(this, 'props.data.config')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const location = this.props.location

    return (
      <BlogIndex
        config={config}
        location={location}
        language='es'
        posts={posts}
      />
    )
  }
}

export default SpanishIndex

export const pageQuery = graphql`
  query {
    config:markdownRemark(frontmatter: {config_language: {eq: "es"}}) {
      ...ConfigIndex
    }
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { language: { eq: "es" } } }
      ) {
      edges {
        node {
          ...BlogIndex
        }
      }
    }
  }
`

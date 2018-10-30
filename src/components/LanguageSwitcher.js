import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"

class LanguageSwitcher extends React.Component {
  render() {
    const { language } = this.props
    return (
      <StaticQuery
        query={graphql`
          query LanguageSwitcherQuery {
            allMarkdownRemark(filter: { frontmatter: { type: {eq: "language"}}}) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    language
                    language_label
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              if (node.frontmatter.language == language) { return }
              return (
                <h5 style={{
                  marginBottom: 0,
                  marginTop: 0,
                  zIndex: 10
                }}>
                  <Link style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                  }} to={node.fields.slug}>
                    {node.frontmatter.language_label}
                  </Link>
                </h5>
              )
            })}
          </div>
        )}
      />
    )
  }
}

export default LanguageSwitcher

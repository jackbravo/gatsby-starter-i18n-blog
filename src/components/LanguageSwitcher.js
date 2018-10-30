import React from 'react'
import { StaticQuery, graphql } from "gatsby"

class LanguageSwitcher extends React.Component {
  render() {
    const { language } = this.props
    return (
      <StaticQuery
        query={graphql`
          query LanguageSwitcherQuery {
            allMarkdownRemark(filter: { frontmatter: { config_language: {ne: null}}}) {
              edges {
                node {
                  frontmatter {
                    config_language
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
              if (node.frontmatter.config_language == language) { return }
              return (
                <h5 style={{marginBottom: 0, marginTop: 0}}>{node.frontmatter.language_label}</h5>
              )
            })}
          </div>
        )}
      />
    )
  }
}

export default LanguageSwitcher

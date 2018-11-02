import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"

class LanguageSwitcher extends React.Component {
  render() {
    const { language, translations } = this.props
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
          <ul style={{ listStyle: `none`, marginBottom: 0 }}>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              if (node.frontmatter.language == language) {
                return
              } else {
                let translationLink = node.fields.slug
                if (translations) {
                  const translationIndex = translations.findIndex(v => v == node.frontmatter.language)
                  if (translationIndex !== -1) {
                    translationLink = translations[translationIndex+1]
                  }
                }
                return (
                  <li key={translationLink} style={{ display: `inline-block`, margin: `0 1rem 0 0` }}>
                    <Link style={{
                      boxShadow: 'none',
                      textDecoration: 'none',
                    }} to={translationLink}>
                      {node.frontmatter.language_label}
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
        )}
      />
    )
  }
}

export default LanguageSwitcher

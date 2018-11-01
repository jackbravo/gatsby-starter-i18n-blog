import React from 'react'
import { Link } from 'gatsby'
import LanguageSwitcher from './LanguageSwitcher'

import { rhythm } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, config, children, translations } = this.props
    let header

    if (`${__PATH_PREFIX__}${config.fields.slug}` === location.pathname) {
      header = (
        <h1
          style={{
            fontSize: '4rem',
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={config.fields.slug}
          >
            {config.frontmatter.title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {config.frontmatter.title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <LanguageSwitcher language={config.frontmatter.language} translations={translations}/>
        {header}
        {children}
      </div>
    )
  }
}

export default Layout

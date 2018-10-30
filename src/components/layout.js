import React from 'react'
import { Link } from 'gatsby'
import LanguageSwitcher from '../components/LanguageSwitcher'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, title, language, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if ([rootPath, `${rootPath}${language}`, `${rootPath}${language}/`].findIndex(v => v == location.pathname) !== -1) {
      header = (
        <h1
          style={{
            ...scale(1.5),
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
            to={'/'}
          >
            {title}
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
            {title}
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
        <LanguageSwitcher language={language}/>
        {header}
        {children}
      </div>
    )
  }
}

export default Template

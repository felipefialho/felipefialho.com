import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const trackGetTheme = (theme) => {
  ReactGA.event({
    category: 'Theme',
    action: 'view',
    label: `Theme - Open page with ${theme}`,
    nonInteraction: true
  })
}

const trackClickTheme = (theme) => {
  ReactGA.event({
    category: 'Theme',
    action: 'click',
    label: `Theme - Change to ${theme}`
  })
}

const ToggleTheme = () => {
  const [theme, setTheme] = useState(null)

  const lightTheme = 'theme-light'
  const darkTheme = 'theme-dark'
  const darkMode = theme === darkTheme

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  if (theme !== null) {
    trackGetTheme(theme)
  }

  const onChange = () => {
    trackClickTheme(theme)
    window.__setTheme(darkMode ? lightTheme : darkTheme)

    if (window && window.DISQUS !== undefined) {
      window.setTimeout(() => window.DISQUS.reset({ reload: true }), 600)
    }
  }

  return (
    <S.ToggleTheme active={!darkMode} onClick={onChange}>
      <Helmet>
        <body className={`${theme}`} />
      </Helmet>
      <S.ToggleThemeTrack />
    </S.ToggleTheme>
  )
}

export default ToggleTheme

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const useDarkModeFromLocalStorage = () => {
  const item = 'darkMode';  
  const initialState = () => JSON.parse(localStorage.getItem(item) || false)
  const [ darkMode, setDarkMode ] = useState(initialState)

  useEffect(() => localStorage.setItem(item, JSON.stringify(darkMode)), [darkMode])

  return [ darkMode, setDarkMode ]
};

const LightButton = () => {
  const [ darkMode, setDarkMode ] = useDarkModeFromLocalStorage()

  const onChange = () => setDarkMode(!darkMode)

  return (
    <S.LightButton active={!darkMode} onClick={onChange}>
      <Helmet>
        <body className={`${darkMode ? 'theme-dark' : 'theme-light'}`} />
      </Helmet>
      <S.LightButtonIcon />
      {darkMode}
    </S.LightButton>
  )
}

export default LightButton
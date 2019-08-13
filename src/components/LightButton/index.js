import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import * as S from './styled'

const useLocalStorage = (key) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem(key) || null
  );

  useEffect(() => localStorage.setItem(key, darkMode));

  return [darkMode, setDarkMode];
};

const LightButton = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode')

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
import * as V from 'styles/variables'

const getActiveTheme = () => {
  if (typeof document === 'undefined') return

  const body = document.querySelector('body')
  return body.classList.contains('theme-dark') ? V.Color.black : V.Color.white
}

export default getActiveTheme

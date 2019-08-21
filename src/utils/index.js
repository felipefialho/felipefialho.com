import * as V from 'styles/variables'

export const getActiveTheme = () => {
  const body = document.querySelector('body')
  return body.classList.contains('theme-dark') ? V.Color.black : V.Color.white
}

// ==================================================
// Variables
//
// 1. Spaces
// 2. Colors
// 3. zIndex
// 4. Misc
// ==================================================

// --------------------------------------------------
// 1. Spaces
// --------------------------------------------------

export const Space = {
  xxs: `.4rem`,
  xs: `.8rem`,
  sm: `1.6rem`,
  default: `2.4rem`,
  md: `3.2rem`,
  lg: `4.8rem`,
  xlg: `6.4rem`,
  xxlg: `9.6rem`,
}

export const Height = {
  headerBarSm: `${Space.lg}`,
  headerSm: `${Space.xxlg}`,
  headerLg: `${Space.xlg}`,
  mainTop: `${Space.default}`
}

// --------------------------------------------------
// 2. Colors
// --------------------------------------------------

export const Color = {
  white: `rgba(255, 255, 255, .95)`,
  black: `rgba(18, 18, 18, .95)`,
  blue: `#0291a7`,
  blueLight: `#aceff9`,
  grayDarker: `#1b1b1b`,
  grayDark: `#333333`,
  gray: `#757575`,
  grayLight: `#aaaaaa`,
  grayLighter: `#efefef`,
  grayWhite: `#f1f1f1`,
  yellow: `#e6af05`,
}

// --------------------------------------------------
// 3. zIndex
// --------------------------------------------------

export const ZIndex = {
  bg: `-1`,
  default: `1`,
}

// --------------------------------------------------
// 4. Misc
// --------------------------------------------------

export const Transition = {
  default: `.25s`,
}

export const BorderRadius = {
  box: `2px`,
}

export const Border = {
  box: `1px solid var(--borderColor)`,
  default: `1px solid var(--borderColor)`,
}

export const BoxShadow = {
  box: `0 1px 3px var(--boxShadow)`,
}

export const MaxSize = {
  md: `750px`,
  lg: `1080px`,
}

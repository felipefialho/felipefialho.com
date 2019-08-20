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
}

// --------------------------------------------------
// 2. Colors
// --------------------------------------------------

export const Color = {
  white: `#fefefe`,
  black: `#0e0e0e`,
  blue: `#0291a7`,
  grayDarker: `#181818`,
  grayDark: `#333333`,
  gray: `#757575`,
  grayLight: `#aaaaaa`,
  grayLighter: `#dddddd`,
  grayWhite: `#f5f5f5`,
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
}

export const BoxShadow = {
  box: `0 1px 4px var(--boxShadow)`,
}

export const MaxSize = {
  md: `750px`,
  lg: `1080px`,
}

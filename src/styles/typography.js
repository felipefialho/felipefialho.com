// ==================================================
// Typography
// ==================================================

import * as V from 'styles/variables'

export const Title = `
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 4rem;
  line-height: 4.8rem;
`

export const Subtitle = `
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 2.4rem;
  letter-spacing: -0.45px;
  line-height: 3.2rem;
`

export const Text = `
  letter-spacing: -0.04px;
  line-height: 1.58;
  text-rendering: optimizeLegibility;
`

export const Link = `
  color: var(--highlightColor);
  position: relative;

  &:after {
    border-bottom: transparent solid 1px;
    content: '';
    left: 0;
    margin-top: ${V.Space.xxs};
    position: absolute;
    top: 100%;
    transition: border-color ${V.Transition.default};
    width: 100%;
    will-change: border-color;
  }

  &:hover {
    &:after {
      border-color: var(--highlightColor);
    }
  }
`

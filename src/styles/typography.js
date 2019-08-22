// ==================================================
// Typography
// ==================================================

import * as V from 'styles/variables'

export const Title = `
  color: var(--primaryColor);
  font-size: 4.2rem;
  line-height: 1.2em;
`

export const Subheading = `
  color: var(--primaryColor);
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: -0.022em;
  line-height: 1.5em;
`

export const Subtitle = `
  color: var(--secondaryColor);
  font-size: 2.2rem;
  letter-spacing: -0.45px;
  line-height: 1.5em;
`

export const Text = `
  font-size: 1.8rem;
  letter-spacing: -0.04px;
  line-height: 1.65em;
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

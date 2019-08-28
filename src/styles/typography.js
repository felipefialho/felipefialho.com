// ==================================================
// Typography
// ==================================================

import * as V from 'styles/variables'

export const Title = `
  color: var(--primaryColor);
  font-size: 4.2rem;
  line-height: 1.2em;
`

export const Subtitle1 = `
  color: var(--secondaryColor);
  font-size: 2.2rem;
  letter-spacing: -0.45px;
  line-height: 1.5em;
`

export const Subtitle2 = `
  color: var(--secondaryColor);
  font-size: 1.8rem;
  letter-spacing: -0.04px;
  line-height: 1.5em;
`

export const Heading1 = `
  color: var(--primaryColor);
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: -0.022em;
  line-height: 1.5em;
`

export const Heading2 = `
  color: var(--primaryColor);
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: -0.04px;
  line-height: 1.5em;
`

export const Heading3 = `
  color: var(--primaryColor);
  font-size: 2.2rem;
  font-weight: 400;
  letter-spacing: -0.04px;
  line-height: 1.5em;
`

export const Heading4 = `
  color: var(--primaryColor);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.04px;
  line-height: 1.5em;
`

export const Text1 = `
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: -0.04px;
  line-height: 1.7em;
`

export const Text2 = `
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: -0.14px;
  line-height: 1.65em;
`

export const LinkTransition = `
  position: relative;

  &:after {
    background-color: var(--highlightColor);
    content: '';
    height: 2px;
    left: 0;
    margin-top: ${V.Space.xs};
    position: absolute;
    top: 100%;
    transform: scaleX(0);
    transition: transform ${V.Transition.default};
    width: 100%;
  }

  &:hover {
    &:after {
      transform: scaleX(1)
    }
  }
`

export const Link = `
  color: var(--highlightColor);
  ${LinkTransition}
`

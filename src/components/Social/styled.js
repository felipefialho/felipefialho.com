import styled, { css } from 'styled-components'
import { Twitter, Github, LinkedinIn, Youtube } from '@styled-icons/fa-brands'

import * as V from 'styles/variables'

const Icon = css`
  & {
    display: block;
    height: 2rem;
    width: 2rem;
  }
`

export const Social = styled.div`
  display: flex;
`

export const SocialItem = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  align-items: center;
  color: var(--primaryColor);
  display: inline-flex;
  height: ${V.Height.footer};
  padding-left: ${V.Space.sm};
  padding-right: ${V.Space.sm};
  transition: color ${V.Transition.default};
  will-change: color;

  &:focus,
  &:hover {
    color: var(--highlightColor);
  }
`

export const SocialYoutube = styled(Youtube)`
  ${Icon}
`

export const SocialTwitter = styled(Twitter)`
  ${Icon}
`

export const SocialGithub = styled(Github)`
  ${Icon}
`

export const SocialLinkedin = styled(LinkedinIn)`
  ${Icon}
`

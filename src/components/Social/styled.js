import styled from 'styled-components'
import { Twitter, Github, LinkedinIn, Codepen, MediumM } from 'styled-icons/fa-brands'

import * as V from 'styles/variables'

const Icon = `
  display: block;
  height: 2rem;
  width: 2rem;
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
  color: var(--primaryColor);
  display: inline-block;
  transition: color ${V.Transition.default};
  will-change: color;

  &:focus,
  &:hover {
    color: ${V.Color.blueLight};
  }

  &:not(:last-child) {
    margin-right: ${V.Space.sm};
  }
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

export const SocialMedium = styled(MediumM)`
  ${Icon}
`

export const SocialCodepen = styled(Codepen)`
  ${Icon}
`

import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Content = styled.article`
  ${T.Text}

  h1 {
    ${T.Title}
    color: var(--primaryColor);

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    ${T.Subtitle}
    color: var(--secondaryColor);

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  .small,
  small {
    font-size: .8em;
  }

  a {
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
  }

  blockquote {
    font-size: 3rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.36px;
    line-height: 4.4rem;
    overflow-wrap: break-word;
    padding-left: ${V.Space.lg};

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.md};
    }
  }

  code {
    background: ${V.Color.black};
    border-radius: 2px;
    color: ${V.Color.white};
    font-size: 1.8rem;
    padding: ${V.Space.xxs} ${V.Space.xs};
  }

  ol, ul {
    list-style: inherit;
    padding-left: ${V.Space.default};

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  li {
    &:not(:last-child) {
      margin-bottom: ${V.Space.xs};
    }
  }
`

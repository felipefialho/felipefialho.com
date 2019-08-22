import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Content = styled.article`
  ${T.Text}

  &:not(:first-child) {
    margin-top: ${V.Space.md};
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.md};
  }

  h1 {
    ${T.Title}

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    ${T.Subheading}

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    font-weight: 300;

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  a {
    ${T.Link}
  }

  blockquote {
    border-left: ${V.Space.xxs} solid var(--highlightColor);
    font-size: 2.4rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.36px;
    line-height: 1.5;
    overflow-wrap: break-word;
    padding-left: ${V.Space.default};

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.lg};
    }
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  ol, ul {
    padding-left: ${V.Space.lg};

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  li {
    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  .gatsby-highlight {
    pre[class*="language-"] {
      border-left: ${V.Space.xxs} solid var(--highlightColor);
      padding-left: ${V.Space.default};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  .language-text {
    background-color: var(--bgSecondary);
    color: var(--colorPrimary);
    padding-left: ${V.Space.xxs};
    padding-right: ${V.Space.xxs};
    text-shadow: none;
  }

  .twitter-tweet {
    font-size: 1.8rem;
    font-style: normal;

    p {
      font-size: 2.4rem;
      font-style: italic;
    }

    a {
      font-size: 1.6rem;

      &:before {
        content: '';
        display: block;
      }
    }
  }
`

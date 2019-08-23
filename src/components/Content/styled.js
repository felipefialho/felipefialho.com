import styled from 'styled-components'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const Content = styled.article`
  ${T.Text1}

  &:not(:first-child) {
    margin-top: ${V.Space.md};
  }

  &:not(:last-child) {
    margin-bottom: ${V.Space.md};
  }

  h1 {
    ${T.Heading1}

    &:not(:first-child) {
      margin-top: ${V.Space.lg};
    }

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  h2 {
    ${T.Heading1}

    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  p {
    &:not(:last-child) {
      margin-bottom: ${V.Space.default};
    }
  }

  a {
    ${T.Link}
  }

  blockquote {
    ${T.Heading3}
    border-left: ${V.Space.xxs} solid var(--highlightColor);
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
      margin-bottom: ${V.Space.sm};
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
    ${T.Text2}

    p {
      ${T.Heading3}
      border-bottom: ${V.Border.box};
      margin-bottom: ${V.Space.sm};
      padding-bottom: ${V.Space.sm};
    }

    a {
      ${T.Text2}

      &:before {
        content: '';
        display: block;
      }
    }
  }
`

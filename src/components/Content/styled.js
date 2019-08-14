import styled from 'styled-components'

import * as V from 'styles/variables'

export const Content = styled.article`
  h1,
  h2,
  p,
  i,
  a {
    text-rendering: optimizeLegibility;
  }

  h1 {
    color: var(--primaryColor);
    font-size: 4rem;
    line-height: 4.8rem;
    font-family: Georgia, 'Times New Roman', Times, serif;

    &:not(:last-child) {
      margin-bottom: ${V.Space.xxs};
    }
  }

  h2 {
    color: var(--secondaryColor);
    font-size: 2.4rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    line-height: 3.2rem;
    letter-spacing: -0.45px;

    &:not(:last-child) {
      margin-bottom: ${V.Space.sm};
    }
  }

  p {
    font-size: 2.1rem;
    letter-spacing: -0.04px;
    line-height: 1.58;

    &:not(:first-child) {
      margin-top: ${V.Space.default};
    }
  }

  a {
    text-decoration: underline;
  }

  blockquote {
    font-size: 3rem;
    font-style: italic;
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
    font-size: 1.8rem;
    background: ${V.Color.black};
    border-radius: 2px;
    color: ${V.Color.white};
    padding: ${V.Space.xxs} ${V.Space.xs};
  }
`

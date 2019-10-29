import styled from 'styled-components'

import * as V from 'styles/variables'

export const FooterData = styled.aside`
  bottom: ${V.Height.footer};
  color: var(--secondaryColor);
  font-size: 1.2rem;
  margin-bottom: ${V.Space.sm};
  position: absolute;
  text-align: center;
  width: 100%;

  .link {
    color: var(--secondaryColor);

    &:hover {
      text-decoration: underline;
    }

    &:before {
      content: '•';
      display: inline-block;
      margin: 0 ${V.Space.xxs};
    }
  }
`

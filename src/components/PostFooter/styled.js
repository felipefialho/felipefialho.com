import styled from 'styled-components'
import media from 'styled-media-query'

import * as V from 'styles/variables'
import * as T from 'styles/typography'

export const PostFooter = styled.div`
  ${T.Text1}
  margin-bottom: ${V.Space.lg};
`

export const PostFooterContent = styled.div`
  margin-bottom: ${V.Space.md};
  margin-top: ${V.Space.md};
  padding-top: ${V.Space.md};
  position: relative;

  &:after {
    border-top: ${V.Border.default};
    content: '';
    left: 20%;
    position: absolute;
    right: 20%;
    top: 0;
  }
`

export const Title = styled.h2`
  ${T.Subtitle1}

  &:not(:last-child) {
    margin-bottom: ${V.Space.sm};
  }
`

export const PostFooterPay = styled.section`
  ${media.greaterThan('medium')`
    display: flex;
    justify-content: space-between;
  `}

  > .item {
    border: ${V.Border.default};
    color: var(--primaryColor);
    display: block;
    padding: ${V.Space.sm};
    text-align: center;
    transition: border-color ${V.Transition.default};
    will-change: border-color;

    ${media.lessThan('small')`
      &:not(:last-child) {
        margin-bottom: ${V.Space.xs};
      }
    `}

    ${media.greaterThan('medium')`
      flex: 1;
      margin: 0 ${V.Space.sm};
    `}
  }

  > a:hover,
  > a:focus {
    border-color: var(--highlightColor);
  }
`

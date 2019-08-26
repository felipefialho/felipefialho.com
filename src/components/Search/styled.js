import styled from 'styled-components'
import media from 'styled-media-query'
import { Algolia } from 'styled-icons/fa-brands/Algolia'

import * as V from 'styles/variables'

export const Search = styled.section`
  display: block;

  .ais {
    &-InstantSearch__root {
      position: relative;
    }

    &-SearchBox {
      position: relative;

      &-input {
        -webkit-appearance: none;
        background-color: var(--bg); 
        border: ${V.Border.box};
        color: var(--primaryColor); 
        display: block;
        height: ${V.Space.lg};
        font-size: 1.8rem;
        line-height: ${V.Space.lg};
        padding-left: ${V.Space.sm};
        padding-right: ${V.Space.xxlg};
        width: 100%;
      }

      &-reset,
      &-submit {
        align-items: center;
        border-left: ${V.Border.box};
        color: var(--secondaryColor); 
        cursor: pointer;
        display: flex;
        height: 100%;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0; 
        transition: color ${V.Transition.default};
        width: ${V.Space.lg};
        will-change: color;

        &:hover,
        &:focus {
          color: var(--highlightColor); 
        }
      }

      &-reset {
        border: none;
        margin-right: ${V.Space.lg};

        &[hidden] {
          display: none;
        }
      }

      &-submitIcon {
        height: ${V.Space.sm};
        width: ${V.Space.sm};
      }
    }

    &-Stats {
      color: var(--texts);
    }
  }
`

export const SearchResults = styled.div`
  margin-top: ${V.Space.md};
`

export const Title = styled.h1`
  align-items: center;
  color: var(--secondaryColor); 
  display: flex;
  font-size: 1.4rem;
  font-weight: 300;
  justify-content: flex-end;
  padding-bottom: ${V.Space.sm};
  padding-top: ${V.Space.sm};
`

export const AlgoliaIcon = styled(Algolia)`
  height: ${V.Space.sm};
  margin-left: ${V.Space.xxs};
  width: ${V.Space.sm};
`
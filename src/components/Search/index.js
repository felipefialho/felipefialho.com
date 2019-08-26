import React from 'react'
import PropTypes from 'prop-types'

import { InstantSearch, SearchBox, Stats, Configure, Hits } from 'react-instantsearch-dom'

import Result from './Result'
import * as S from './styled'

const Search = ({ algolia, callback }) => {

  return (
    <S.Search>
      {algolia && algolia.appId && (
        <>
          <InstantSearch
            appId={algolia.appId}
            apiKey={algolia.searchOnlyApiKey}
            indexName={algolia.indexName}>
            <Configure hitsPerPage={100} distinct />
            <SearchBox
              autoFocus
              translations={{ placeholder: 'Pesquisar no blog...' }} />
            <Stats translations={{ stats(nbHits, timeSpentMS) {
              return `${nbHits} resultados encontrados`
            }}} />
            <S.SearchResults>
              <Hits hitComponent={Result} />
              {callback}
            </S.SearchResults>
          </InstantSearch>
          <S.Title>
            Powered by Algolia
            <S.AlgoliaIcon />
          </S.Title>
        </>
      )}
    </S.Search>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired
}

export default Search
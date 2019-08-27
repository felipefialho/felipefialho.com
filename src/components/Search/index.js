import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { InstantSearch, SearchBox, Stats, Configure, Hits } from 'react-instantsearch-dom'

import Result from './Result'
import * as S from './styled'

const trackSearch = (term) => {
  ReactGA.event({
    category: 'Search',
    action: 'search',
    label: `Search - ${term}`
  })
}

const Search = ({ algolia, callback }) => {
  return (
    <S.Search>
      {algolia && algolia.appId ? (
        <div>
          <InstantSearch
            appId={algolia.appId}
            apiKey={algolia.searchOnlyApiKey}
            onSearchStateChange={({ query }) => trackSearch(query)}
            indexName={algolia.indexName}>
            <Configure hitsPerPage={100} distinct />
            <SearchBox
              autoFocus
              translations={{ placeholder: 'Pesquisar no blog...' }} />
            <Stats translations={{
              stats(nbHits, timeSpentMS) {
                return `${nbHits} resultados encontrados`
              }
            }} />
            <S.SearchResults>
              <Hits hitComponent={Result} />
              {callback}
            </S.SearchResults>
          </InstantSearch>
          <S.Title>
            Powered by Algolia
            <S.AlgoliaIcon />
          </S.Title>
        </div>
      ) : (
        <nav>{callback}</nav>
      )}}
    </S.Search>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired
}

export default Search

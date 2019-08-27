import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { InstantSearch, SearchBox, Stats, Configure, Hits } from 'react-instantsearch-dom'

import Hit from './Hit'
import * as S from './styled'

const trackSearch = (term) => {
  ReactGA.event({
    category: 'Search',
    action: 'search',
    label: `Search - ${term}`
  })
}

const Search = ({ algolia, callback }) => {
  const [ search, setSearch ] = useState('')

  const onSearchStateChange = (searchState) => {
    trackSearch(searchState.query)
    setSearch(searchState)
  }

  return (
    <S.Search>
      {algolia && algolia.appId ? (
        <div>
          <InstantSearch
            appId={algolia.appId}
            apiKey={algolia.searchOnlyApiKey}
            onSearchStateChange={(searchState) => onSearchStateChange(searchState)}
            indexName={algolia.indexName}>
            <Configure hitsPerPage={100} distinct />
            <SearchBox
              autoFocus
              translations={{ placeholder: 'Pesquisar no blog...' }} />
            {search && search.query ? (
              <>
                <Stats translations={{
                  stats(nbHits, timeSpentMS) {
                    return `${nbHits} resultados encontrados`
                  }
                }} />
                <Hits hitComponent={Hit} />
              </>
              ) : (
                <nav>{callback}</nav>
            )}
          </InstantSearch>
          <S.Title>
            Powered by Algolia
            <S.AlgoliaIcon />
          </S.Title>
        </div>
      ) : (
        <nav>{callback}</nav>
      )}
    </S.Search>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired
}

export default Search

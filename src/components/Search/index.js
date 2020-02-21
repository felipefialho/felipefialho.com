import React, { useState } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import ReactGA from 'react-ga'
import algoliasearch from 'algoliasearch/lite'

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

const urlToSearchState = ({ search }) => qs.parse(search.slice(1))

const Search = ({ algolia, callback, props }) => {
  const { location } = props
  
  const [searchState, setSearchState] = useState(urlToSearchState(location))

  const onSearchStateChange = (updatedSearchState) => {
    trackSearch(updatedSearchState.query)
    setSearchState(updatedSearchState)
  }

  const searchClient = algolia && algoliasearch(
    algolia.appId,
    algolia.searchOnlyApiKey
  )

  return (
    <S.Search>
      {algolia && algolia.appId ? (
        <div>
          <InstantSearch
            searchClient={searchClient}
            indexName={algolia.indexName}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}>
            <Configure hitsPerPage={100} distinct />
            <SearchBox
              translations={{ placeholder: 'Pesquisar no blog...' }} />
            {searchState && searchState.query ? (
              <>
                <Stats translations={{
                  stats(nbHits) {
                    return `${nbHits} resultados encontrados`
                  }
                }} />
                <Hits hitComponent={Hit} />
              </>
              ) : (<nav>{callback}</nav>)
            }
          </InstantSearch>
          <S.Title>
            Powered by Algolia
            <S.AlgoliaIcon />
          </S.Title>
        </div>
        ) : (<nav>{callback}</nav>)
      }
    </S.Search>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired,
  callback: PropTypes.node
}

export default Search

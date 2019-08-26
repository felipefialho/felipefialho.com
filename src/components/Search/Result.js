import React from 'react'
import PropTypes from 'prop-types'

import BlogItem from 'components/BlogItem'

const Result = ({ props }) => {
  const { hit } = props

  console.log(hit)

  return (
    <BlogItem
      slug={hit.fields.slug}
      date={hit.frontmatter.date}
      title={hit.frontmatter.title}
      description={hit.frontmatter.description}
      tags={hit.frontmatter.tags}
      timeToRead={hit.timeToRead}
    />
  )
}

Result.propTypes = {
  hit: PropTypes.object.isRequired
}

export default Result
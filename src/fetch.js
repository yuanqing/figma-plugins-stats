const unfetch = require('isomorphic-unfetch')

function fetch (url) {
  return unfetch(
    typeof window === 'undefined'
      ? url
      : `https://cors-anywhere.herokuapp.com/${url}`
  )
}

module.exports = fetch

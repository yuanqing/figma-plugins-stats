const fetch = require('./fetch')

async function fetchFigmaPluginsStats () {
  const data = await fetchRawData()
  return parseData(data)
}

const url = 'https://www.figma.com/api/plugins/top'

async function fetchRawData () {
  const response = await fetch(url)
  const json = await response.json()
  return json.meta
}

function parseData (data) {
  const plugins = []
  for (const item of data) {
    const metaData = Object.values(item.versions)[0]
    plugins.push({
      id: item.id,
      name: metaData.name,
      description: metaData.description,
      lastUpdateDate: metaData.created_at,
      tags: [].concat(item.tags).sort(),
      publisherHandle: item.publisher.profile_handle,
      publisherId: item.publisher.id,
      publisherName: item.publisher.name,
      installCount: item.install_count,
      likeCount: item.like_count,
      viewCount: item.view_count
    })
  }
  return plugins.sort(function (a, b) {
    return a.name.localeCompare(b.name)
  })
}

module.exports = fetchFigmaPluginsStats

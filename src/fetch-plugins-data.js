const fetch = require('./utilities/fetch')

async function fetchPluginsData () {
  const data = await fetchRawData()
  return parseData(data)
}

async function fetchRawData () {
  let result = []
  let url = 'https://www.figma.com/api/plugins/all?sort_by=popular&page_size=50'
  while (typeof url !== 'undefined') {
    const response = await fetch(url)
    const json = await response.json()
    result = result.concat(json.meta.plugins)
    url = json.pagination.next_page
  }
  return deduplicate(result)
}

function deduplicate (data) {
  const result = []
  const ids = {}
  for (const item of data) {
    const id = item.id
    if (ids[id] !== true) {
      result.push(item)
      ids[id] = true
    }
  }
  return result
}

function parseData (data) {
  const result = []
  for (const item of data) {
    const metaData = Object.values(item.versions)[0]
    result.push({
      id: item.id,
      name: metaData.name,
      description: metaData.description,
      lastUpdateDate: metaData.created_at,
      tags: [].concat(item.tags).sort(),
      authorId: item.creator.id,
      authorName: item.creator.handle,
      installCount: item.install_count,
      likeCount: item.like_count,
      viewCount: item.view_count
    })
  }
  return result.sort(function (a, b) {
    return a.name.localeCompare(b.name)
  })
}

module.exports = fetchPluginsData

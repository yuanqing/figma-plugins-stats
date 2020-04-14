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
  const plugins = []
  const orgsAndTeams = {}
  for (const item of data) {
    const metaData = Object.values(item.versions)[0]
    if (item.author_org !== null || item.author_team !== null) {
      const id =
        item.author_org !== null ? item.author_org.id : item.author_team.id
      if (typeof orgsAndTeams[id] === 'undefined') {
        orgsAndTeams[id] = []
      }
      orgsAndTeams[id].push(item.id)
    }
    plugins.push({
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
  return {
    plugins: plugins.sort(function (a, b) {
      return a.name.localeCompare(b.name)
    }),
    orgsAndTeams
  }
}

module.exports = fetchPluginsData

const fetch = require('../utilities/fetch')
const fetchAuthorId = require('../fetch-author-id')
const parseISO = require('date-fns/parseISO')
const subDays = require('date-fns/subDays')

async function figmaPluginsData ({ authorHandle, timeOffset }) {
  let data = await fetchScrapedData(timeOffset)
  const authorId =
    typeof authorHandle === 'undefined'
      ? null
      : await fetchAuthorId(authorHandle)
  data = parseData(data, { authorId })
  return data
}

const BASE_URL = 'https://yuanqing.github.io/figma-plugins-data/'

async function fetchScrapedData (timeOffset) {
  const response = await fetch(BASE_URL)
  const json = await response.json()
  const endDate = parseISO(json.date)
  const plugins = json.plugins
  let i = 0
  let date = endDate
  const promises = []
  while (i < timeOffset + 1) {
    date = subDays(date, 1)
    promises.push(
      new Promise(function (resolve) {
        fetch(`${BASE_URL}${date.toISOString().slice(0, 10)}.json`)
          .then(function (response) {
            return response.json()
          })
          .then(function (json) {
            resolve(json.stats)
          })
      })
    )
    i++
  }
  const stats = (await Promise.all(promises)).reverse()
  return {
    plugins,
    stats
  }
}

const MAP_KEY_TO_INDEX = {
  installCount: 0,
  likeCount: 1,
  viewCount: 2
}

function parseData ({ plugins, stats }, { authorId }) {
  if (authorId !== null) {
    plugins = plugins.filter(function (plugin) {
      return plugin.authorId === authorId
    })
  }
  const result = []
  for (const plugin of plugins) {
    const keys = Object.keys(MAP_KEY_TO_INDEX)
    const pluginCounts = {}
    for (const key of keys) {
      const index = MAP_KEY_TO_INDEX[key]
      const counts = []
      for (const stat of stats) {
        counts.push(
          typeof stat[plugin.id] === 'undefined' ? null : stat[plugin.id][index]
        )
      }
      pluginCounts[key] = {
        currentCount: counts[counts.length - 1],
        counts,
        deltas: computeDeltas(counts),
        totalDelta: counts[counts.length - 1] - counts[0]
      }
    }
    result.push({
      name: plugin.name,
      ...pluginCounts
    })
  }
  return result
}

function computeDeltas (counts) {
  const result = []
  counts.forEach(function (count, index) {
    if (index === 0) {
      return
    }
    result.push(count - counts[index - 1])
  })
  return result
}

module.exports = figmaPluginsData

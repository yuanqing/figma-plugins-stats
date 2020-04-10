const parseISO = require('date-fns/parseISO')
const subDays = require('date-fns/subDays')
const isBefore = require('date-fns/isBefore')
const fetch = require('../utilities/fetch')
const fetchAuthorId = require('../fetch-author-id')
const fetchPluginsData = require('../fetch-plugins-data')
const sortComparators = require('./utilities/sort-comparators')

async function figmaPluginsStats ({ authorHandle, limit, sort, timeOffset }) {
  const pluginsData = await fetchPluginsData()
  const { stats, startDate } = await fetchScrapedStats(timeOffset)
  const authorId =
    typeof authorHandle === 'undefined'
      ? null
      : await fetchAuthorId(authorHandle)
  const plugins = parseData(pluginsData, stats, {
    authorId,
    limit,
    sortComparator: sortComparators[sort]
  })
  if (plugins.length === 0) {
    throw new Error(`User ‘${authorHandle}’ has no public plugins`)
  }
  return {
    plugins,
    totals: computeTotals(plugins, { timeOffset }),
    startDate
  }
}

const BASE_URL = 'https://yuanqing.github.io/figma-plugins-stats'
const EARLIEST_DATE = new Date('2020-04-01')

async function fetchScrapedStats (timeOffset) {
  const response = await fetch(`${BASE_URL}/stats.json`)
  const json = await response.json()
  const stats = json.stats
  let i = 0
  let date = parseISO(json.date)
  let startDate = new Date(date.getTime())
  const promises = []
  while (i < timeOffset) {
    date = subDays(date, 1)
    if (isBefore(date, EARLIEST_DATE) === true) {
      break
    }
    startDate = new Date(date.getTime())
    promises.push(
      new Promise(function (resolve) {
        fetch(`${BASE_URL}/${date.toISOString().slice(0, 10)}.json`)
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
  const result = await Promise.all(promises)
  return {
    startDate,
    stats: [stats, ...result].reverse()
  }
}

const MAP_KEY_TO_INDEX = {
  installCount: 0,
  likeCount: 1,
  viewCount: 2
}
const KEYS = Object.keys(MAP_KEY_TO_INDEX)

function parseData (plugins, stats, { authorId, limit, sortComparator }) {
  if (authorId !== null) {
    plugins = plugins.filter(function (plugin) {
      return plugin.authorId === authorId
    })
  }
  let result = []
  for (const plugin of plugins) {
    const pluginCounts = {}
    for (const key of KEYS) {
      const index = MAP_KEY_TO_INDEX[key]
      const counts = []
      for (const stat of stats) {
        counts.push(
          typeof stat[plugin.id] === 'undefined' ? null : stat[plugin.id][index]
        )
      }
      counts.push(plugin[key])
      pluginCounts[key] = {
        count: counts[counts.length - 1],
        deltas: computeDeltas(counts),
        totalDelta: counts[counts.length - 1] - counts[0]
      }
    }
    result.push({
      name: plugin.name,
      author: plugin.authorName,
      ...pluginCounts
    })
  }
  result = result.sort(sortComparator)
  if (typeof limit === 'undefined' || limit === true) {
    return result
  }
  return result.slice(0, limit)
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

function computeTotals (plugins, { timeOffset }) {
  const result = {}
  for (const key of KEYS) {
    result[key] = {
      count: 0,
      deltas: Array(timeOffset + 1).fill(0),
      totalDelta: 0
    }
    for (const plugin of plugins) {
      result[key].count += plugin[key].count
      plugin[key].deltas.forEach(function (delta, index) {
        result[key].deltas[index] += delta
      })
      result[key].totalDelta += plugin[key].totalDelta
    }
  }
  return result
}

module.exports = figmaPluginsStats

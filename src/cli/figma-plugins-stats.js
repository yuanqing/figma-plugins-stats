const ms = require('ms')
const fetchAuthorId = require('../fetch-author-id')
const fetchPluginsData = require('../fetch-plugins-data')
const fetchStats = require('../fetch-stats')
const sortComparators = require('./utilities/sort-comparators')
const parseData = require('./utilities/parse-data')

async function figmaPluginsStats ({ handle, limit, sort, timeOffset }) {
  const timeOffsetInMilliseconds = ms(timeOffset)
  if (timeOffsetInMilliseconds < ms('1d')) {
    throw new Error('Time offset must be at least `1d`')
  }
  const endDate = new Date()
  const pluginsData = await fetchPluginsData()
  const { startDate, stats } = await fetchStats(
    endDate,
    timeOffsetInMilliseconds
  )
  const authorId =
    typeof handle === 'undefined' ? null : await fetchAuthorId(handle)
  const { plugins, totals } = parseData(pluginsData, stats, {
    authorId,
    limit,
    sortComparator: sortComparators[sort]
  })
  if (plugins.length === 0) {
    throw new Error(`User ‘${handle}’ has no public plugins`)
  }
  return {
    plugins,
    totals,
    startDate,
    endDate
  }
}

module.exports = figmaPluginsStats

const ms = require('ms')
const fetchFigmaPluginsStats = require('./fetch/fetch-figma-plugins-stats')
const fetchHistoricalStats = require('./fetch/fetch-historical-stats')
const sortComparators = require('./utilities/sort-comparators')
const parseData = require('./utilities/parse-data')

async function figmaPluginsStats ({ handle, limit, sort, timeOffset }) {
  const timeOffsetInMilliseconds = ms(timeOffset)
  if (timeOffsetInMilliseconds < ms('1d')) {
    throw new Error('Time offset must be at least 1 day (`1d`)')
  }
  const endDate = new Date()
  const pluginsData = await fetchFigmaPluginsStats()
  const { startDate, stats } = await fetchHistoricalStats(
    endDate,
    timeOffsetInMilliseconds
  )
  const { plugins, totals } = parseData(pluginsData, stats, {
    handle,
    limit,
    sortComparator: sortComparators[sort]
  })
  if (plugins.length === 0) {
    throw new Error(`User \`${handle}\` has no public plugins`)
  }
  return {
    plugins,
    totals,
    startDate,
    endDate
  }
}

module.exports = figmaPluginsStats

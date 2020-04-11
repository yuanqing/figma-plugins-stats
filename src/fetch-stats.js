const addMilliseconds = require('date-fns/addMilliseconds')
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds')
const isBefore = require('date-fns/isBefore')
const isSameDay = require('date-fns/isSameDay')
const parseISO = require('date-fns/parseISO')
const subMilliseconds = require('date-fns/subMilliseconds')
const ms = require('ms')
const fetch = require('./utilities/fetch')

async function fetchStats (endDate, timeOffsetInMilliseconds) {
  const lastStats = await fetchStatsForDate(null)
  const dates = computeDates(lastStats.date, endDate, timeOffsetInMilliseconds)
  const promises = []
  for (const date of dates) {
    promises.push(fetchStatsForDate(date))
  }
  const results = await Promise.all(promises)
  results.push(lastStats)
  return {
    startDate: results[0].date,
    stats: results.map(function ({ stats }) {
      return stats
    })
  }
}

const BASE_URL = 'https://yuanqing.github.io/figma-plugins-stats/'

async function fetchStatsForDate (date) {
  const response = await fetch(
    `${BASE_URL}${
      date === null ? 'stats' : date.toISOString().slice(0, 10)
    }.json`
  )
  const json = await response.json()
  return {
    date: parseISO(json.date),
    stats: json.stats
  }
}

const EARLIEST_STATS_DATE = new Date('2020-04-01') // only have data going back to this date
const GRANULARITY = 7 // number of segments in our sparklines
const ONE_DAY_IN_MILLISECONDS = ms('1d')

function computeDates (lastStatsDate, endDate, timeOffsetInMilliseconds) {
  let date = subMilliseconds(
    lastStatsDate,
    timeOffsetInMilliseconds - differenceInMilliseconds(endDate, lastStatsDate)
  )
  if (isBefore(date, EARLIEST_STATS_DATE) === true) {
    date = new Date(EARLIEST_STATS_DATE.getTime())
  }
  const intervalInMilliseconds = Math.max(
    parseInt(differenceInMilliseconds(lastStatsDate, date) / GRANULARITY, 10),
    ONE_DAY_IN_MILLISECONDS // each interval to be 1 day at the least
  )
  const dates = []
  let i = -1
  while (++i < GRANULARITY && isSameDay(date, lastStatsDate) === false) {
    dates.push(new Date(date.getTime()))
    date = addMilliseconds(date, intervalInMilliseconds)
  }
  return dates
}

module.exports = fetchStats

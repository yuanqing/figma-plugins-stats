import {
  addMilliseconds,
  differenceInMilliseconds,
  isBefore,
  isSameDay,
  parseISO,
  subMilliseconds
} from 'date-fns'
import ms from 'ms'

import { PluginStats } from '../types.js'
import { fetchAsync } from './fetch-async.js'

export async function fetchHistoricalPluginStatsAsync(
  endDate: Date,
  timeOffsetInMilliseconds: number
): Promise<{ startDate: Date; stats: Array<{ [id: string]: PluginStats }> }> {
  const lastStats = await fetchHistoricalPluginStatsForDate(null)
  const dates = computeDates(lastStats.date, endDate, timeOffsetInMilliseconds)
  const promises = []
  for (const date of dates) {
    promises.push(fetchHistoricalPluginStatsForDate(date))
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

const GITHUB_PAGES_BASE_URL = 'https://yuanqing.github.io/figma-plugins-stats/'

async function fetchHistoricalPluginStatsForDate(
  date: null | Date
): Promise<{ date: Date; stats: { [id: string]: PluginStats } }> {
  const response = await fetchAsync(
    `${GITHUB_PAGES_BASE_URL}${
      date === null ? 'stats' : date.toISOString().slice(0, 10)
    }.json`
  )
  const json: any = await response.json()
  const stats: { [id: string]: PluginStats } = {}
  for (const id in json.stats) {
    stats[id] = {
      installCount: json.stats[id][0],
      likeCount: json.stats[id][1],
      runCount: json.stats[id][2],
      viewCount: json.stats[id][3]
    }
  }
  return {
    date: parseISO(json.date),
    stats
  }
}

const EARLIEST_STATS_DATE = new Date('2020-04-01') // only have data going back to this date
const GRANULARITY = 4 // number of segments in our sparklines
const ONE_DAY_IN_MILLISECONDS = ms('1d')

function computeDates(
  lastStatsDate: Date,
  endDate: Date,
  timeOffsetInMilliseconds: number
): Array<Date> {
  let date = subMilliseconds(
    lastStatsDate,
    timeOffsetInMilliseconds - differenceInMilliseconds(endDate, lastStatsDate)
  )
  if (isBefore(date, EARLIEST_STATS_DATE) === true) {
    date = new Date(EARLIEST_STATS_DATE.getTime())
  }
  const intervalInMilliseconds = Math.max(
    parseInt(
      `${differenceInMilliseconds(lastStatsDate, date) / GRANULARITY}`,
      10
    ),
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

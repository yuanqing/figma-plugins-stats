import { Count, Counts, Plugin, PluginData, PluginStats } from '../types'
import { pluginStatsKeys } from './plugins-stats-keys'

export function parseData(
  pluginsData: Array<PluginData>,
  stats: Array<{ [id: string]: PluginStats }>,
  {
    handle,
    limit,
    sortComparator
  }: {
    handle: null | string
    limit: number
    sortComparator: (a: Plugin, b: Plugin) => number
  }
): {
  plugins: Array<Plugin>
  totals: Counts
} {
  const filteredPluginsData =
    handle === null ? pluginsData : filterPluginsByHandle(pluginsData, handle)
  let pluginsSummary: Array<Plugin> = []
  for (const pluginData of filteredPluginsData) {
    const pluginSummaryCounts = {} as {
      [key in keyof PluginStats]: Count
    }
    for (const key of pluginStatsKeys) {
      const counts = []
      for (const statsItem of stats) {
        const pluginStats = statsItem[pluginData.id]
        counts.push(typeof pluginStats === 'undefined' ? 0 : pluginStats[key])
      }
      counts.push(pluginData[key])
      pluginSummaryCounts[key] = {
        count: counts[counts.length - 1],
        deltas: computeDeltas(counts),
        totalDelta: counts[counts.length - 1] - counts[0]
      }
    }
    pluginsSummary.push({
      name: pluginData.name,
      publisher: pluginData.publisherName,
      ...pluginSummaryCounts
    })
  }
  pluginsSummary.sort(sortComparator)
  if (typeof limit !== 'undefined' && limit !== -1) {
    pluginsSummary = pluginsSummary.slice(0, limit)
  }
  return {
    plugins: pluginsSummary,
    totals: computeTotals(pluginsSummary)
  }
}

function filterPluginsByHandle(
  pluginsData: Array<PluginData>,
  handle: string
): Array<PluginData> {
  return pluginsData.filter(function (plugin: any) {
    return plugin.publisherHandle === handle
  })
}

function computeDeltas(counts: Array<number>): Array<number> {
  const result: Array<number> = []
  counts.forEach(function (count: any, index: any) {
    if (index === 0) {
      return
    }
    result.push(count - counts[index - 1])
  })
  return result
}

function computeTotals(pluginsSummary: Array<Plugin>): Counts {
  const totals = {} as { [key in keyof PluginStats]: Count }
  for (const key of pluginStatsKeys) {
    totals[key] = {
      count: 0,
      deltas: [],
      totalDelta: 0
    }
    for (const plugin of pluginsSummary) {
      totals[key].count += plugin[key].count
      plugin[key].deltas.forEach(function (delta: any, index: any) {
        if (typeof totals[key].deltas[index] === 'undefined') {
          totals[key].deltas[index] = 0
        }
        totals[key].deltas[index] += delta
      })
      totals[key].totalDelta += plugin[key].totalDelta
    }
  }
  return totals
}

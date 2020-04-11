const MAP_KEY_TO_INDEX = {
  installCount: 0,
  likeCount: 1,
  viewCount: 2
}

function parseData (plugins, stats, { authorId, limit, sortComparator }) {
  if (authorId !== null) {
    plugins = plugins.filter(function (plugin) {
      return plugin.authorId === authorId
    })
  }
  let result = []
  for (const plugin of plugins) {
    const pluginCounts = {}
    for (const key of Object.keys(MAP_KEY_TO_INDEX)) {
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
  if (typeof limit !== 'undefined' && limit !== true) {
    result = result.slice(0, limit)
  }
  // console.log(JSON.stringify(result, null, 4))
  return {
    plugins: result,
    totals: computeTotals(result)
  }
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

function computeTotals (plugins) {
  const result = {}
  for (const key of Object.keys(MAP_KEY_TO_INDEX)) {
    result[key] = {
      count: 0,
      deltas: [],
      totalDelta: 0
    }
    for (const plugin of plugins) {
      result[key].count += plugin[key].count
      plugin[key].deltas.forEach(function (delta, index) {
        if (typeof result[key].deltas[index] === 'undefined') {
          result[key].deltas[index] = 0
        }
        result[key].deltas[index] += delta
      })
      result[key].totalDelta += plugin[key].totalDelta
    }
  }
  return result
}

module.exports = parseData

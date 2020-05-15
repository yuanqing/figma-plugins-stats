const fs = require('fs-extra')
const path = require('path')
const fetchPluginsData = require('../src/fetch-plugins-data')

const DATA_DIRECTORY_NAME = 'data'
const META_DATA_FILE_NAME = 'index.json'
const STATS_DATA_FILE_NAME = 'stats.json'

async function main () {
  const date = new Date().toISOString()
  const plugins = await fetchPluginsData()
  await writeFile({ date, plugins }, META_DATA_FILE_NAME)
  const stats = extractStats(plugins)
  await writeFile({ date, stats }, STATS_DATA_FILE_NAME)
  await writeFile({ date, stats }, `${date.slice(0, 10)}.json`)
}
main()

function extractStats (plugins) {
  const stats = {}
  for (const { id, installCount, likeCount, viewCount } of plugins) {
    stats[id] = [installCount, likeCount, viewCount]
  }
  return stats
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY_NAME, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

const fs = require('fs-extra')
const path = require('path')
const fetchPluginsData = require('../src/fetch-plugins-data')

const DATA_DIRECTORY = 'data'
const META_DATA_FILE = 'index.json'

async function main () {
  const date = new Date().toISOString().slice(0, 10)
  const pluginsData = await fetchPluginsData()
  await writeFile({ date, plugins: pluginsData }, META_DATA_FILE)
  const stats = extractStats(pluginsData)
  await writeFile(stats, `${date}.json`)
}
main()

function extractStats (pluginsData) {
  const stats = {}
  for (const { id, installCount, likeCount, viewCount } of pluginsData) {
    stats[id] = [installCount, likeCount, viewCount]
  }
  return stats
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

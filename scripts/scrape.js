const fs = require('fs-extra')
const path = require('path')
const fetchPluginsData = require('../src/fetch-plugins-data')

const DATA_DIRECTORY_NAME = 'data'
const META_DATA_FILE_NAME = 'index.json'

async function main () {
  const date = new Date().toISOString()
  const pluginsData = await fetchPluginsData()
  await writeFile({ date, plugins: pluginsData }, META_DATA_FILE_NAME)
  const stats = extractStats(pluginsData)
  const statsFileName = `${date.slice(0, 10)}.json`
  await writeFile({ date, stats }, statsFileName)
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
  const file = path.join(DATA_DIRECTORY_NAME, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

const fs = require('fs-extra')
const path = require('path')
const figmaPluginsData = require('./figma-plugins-data')

const DATA_DIRECTORY = 'data'
const META_DATA_FILE = 'index.json'

async function main () {
  const date = new Date().toISOString().slice(0, 10)
  const data = await figmaPluginsData()
  await writeFile({ date, plugins: data }, META_DATA_FILE)
  const statistics = parseStatistics(data)
  await writeFile(statistics, `${date}.json`)
}
main()

function parseStatistics (data) {
  const statistics = {}
  for (const { id, installCount, likeCount, viewCount } of data) {
    statistics[id] = [installCount, likeCount, viewCount]
  }
  return statistics
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

const fs = require('fs-extra')
const path = require('path')
const figmaPluginsData = require('./figma-plugins-data')

const DATA_DIRECTORY = 'data'
const META_DATA_FILE = 'index.json'

async function main () {
  const date = new Date().toISOString().slice(0, 10)
  const data = await figmaPluginsData()
  const { plugins, statistics } = parseData(data, date)
  await writeFile({ date, plugins }, META_DATA_FILE)
  await writeFile(statistics, `${date}.json`)
}
main()

function parseData (data) {
  const plugins = []
  const statistics = {}
  for (const { id, installCount, likeCount, viewCount, ...rest } of data) {
    plugins.push({ id, ...rest })
    statistics[id] = [installCount, likeCount, viewCount]
  }
  return {
    plugins,
    statistics
  }
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

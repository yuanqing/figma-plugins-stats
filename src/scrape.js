const fs = require('fs-extra')
const path = require('path')
const figmaPluginsData = require('./figma-plugins-data')

const DATA_DIRECTORY = 'data'
const INDEX_FILE = 'index.json'
const META_DATA_FILE = 'plugins.json'

async function main () {
  const data = await figmaPluginsData()
  const { metaData, statistics } = parseData(data)
  await writeFile(metaData, META_DATA_FILE)
  const date = new Date().toISOString().slice(0, 10)
  await writeFile(statistics, `${date}.json`)
  const index = await createIndex()
  await writeFile(index, INDEX_FILE)
}
main()

function parseData (data) {
  const metaData = []
  const statistics = {}
  for (const { id, installCount, likeCount, viewCount, ...rest } of data) {
    metaData.push({ id, ...rest })
    statistics[id] = [installCount, likeCount, viewCount]
  }
  return {
    metaData,
    statistics
  }
}

async function createIndex () {
  return fs
    .readdirSync(DATA_DIRECTORY)
    .filter(function (file) {
      return (
        path.extname(file) === '.json' &&
        file !== INDEX_FILE &&
        file !== META_DATA_FILE
      )
    })
    .map(function (file) {
      return path.basename(file, '.json')
    })
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

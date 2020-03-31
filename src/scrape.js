const fetch = require('isomorphic-unfetch')
const fs = require('fs-extra')
const path = require('path')

const DATA_DIRECTORY = 'data'
const INDEX_FILE = 'index.json'
const META_DATA_FILE = 'plugins.json'

async function main () {
  const data = await fetchRawData()
  const metaData = await createMetaData(data)
  await writeFile(metaData, META_DATA_FILE)
  const statistics = await createStatistics(data)
  const date = new Date().toISOString().slice(0, 10)
  await writeFile(statistics, `${date}.json`)
  const index = await createIndex()
  await writeFile(index, INDEX_FILE)
}
main()

async function fetchRawData () {
  let result = []
  let url = 'https://www.figma.com/api/plugins/all?sort_by=popular&page_size=50'
  while (typeof url !== 'undefined') {
    const response = await fetch(url)
    const json = await response.json()
    result = result.concat(json.meta.plugins)
    url = json.pagination.next_page
  }
  return result.sort(function (a, b) {
    return a.id.localeCompare(b.id)
  })
}

function createMetaData (data) {
  const result = {}
  for (const item of data) {
    const metaData = Object.values(item.versions)[0]
    result[item.id] = {
      name: metaData.name,
      description: metaData.description,
      lastUpdateDate: metaData.created_at,
      tags: [].concat(item.tags).sort()
    }
  }
  return result
}

function createStatistics (data) {
  const result = {}
  for (const item of data) {
    result[item.id] = [item.install_count, item.like_count, item.view_count]
  }
  return result
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
  await fs.outputFile(file, JSON.stringify(data), 'utf8')
}

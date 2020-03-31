const fetch = require('isomorphic-unfetch')
const fs = require('fs-extra')
const path = require('path')

const DATA_DIRECTORY = 'data'
const INDEX_FILE = 'index.json'

async function main () {
  const data = await fetchData()
  await writeDataFile(data)
  await writeIndexFile()
}
main()

async function fetchData () {
  let data = []
  let url = 'https://www.figma.com/api/plugins/all?sort_by=popular&page_size=50'
  while (typeof url !== 'undefined') {
    const response = await fetch(url)
    const json = await response.json()
    data = data.concat(json.meta.plugins)
    url = json.pagination.next_page
  }
  return data
}

async function writeDataFile (data) {
  const date = new Date().toISOString().slice(0, 10)
  const file = path.join(DATA_DIRECTORY, `${date}.json`)
  await fs.outputFile(file, JSON.stringify(data), 'utf8')
}

async function writeIndexFile () {
  const files = fs
    .readdirSync(DATA_DIRECTORY)
    .filter(function (file) {
      return path.extname(file) === '.json' && file !== INDEX_FILE
    })
    .map(function (file) {
      return path.basename(file, '.json')
    })
  const file = path.join(DATA_DIRECTORY, INDEX_FILE)
  await fs.outputFile(file, JSON.stringify(files), 'utf8')
}

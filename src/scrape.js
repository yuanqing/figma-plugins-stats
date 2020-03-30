const fetch = require('isomorphic-unfetch')
const fs = require('fs-extra')
const path = require('path')

async function main () {
  const data = await fetchData()
  await writeData(data)
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

async function writeData (data) {
  const directory = 'data'
  const date = new Date().toISOString().slice(0, 10)
  const file = path.join(directory, `${date}.json`)
  await fs.ensureDir(directory)
  await fs.writeFile(file, JSON.stringify(data), 'utf8')
}

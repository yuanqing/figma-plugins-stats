const fs = require('fs-extra')
const path = require('path')
const fetchFigmaPluginsStats = require('../src/fetch/fetch-figma-plugins-stats')

const DATA_DIRECTORY_NAME = 'data'
const META_DATA_FILE_NAME = 'index.json'
const STATS_DATA_FILE_NAME = 'stats.json'

const PUBLISHERS_DIRECTORY_NAME = 'publisher'
const PLUGINS_DIRECTORY_NAME = 'plugin'
const INSTALLS_DATA_FILE_NAME = 'installs.json'
const LIKES_DATA_FILE_NAME = 'likes.json'

async function main () {
  const date = new Date().toISOString()
  const plugins = await fetchFigmaPluginsStats()
  await writeFile({ date, plugins }, META_DATA_FILE_NAME)
  await writeStats(date, plugins)
  await writePlugins(plugins)
  await writePublishers(plugins)
}
main()

async function writeStats (date, plugins) {
  const stats = {}
  for (const { id, installCount, likeCount, viewCount } of plugins) {
    stats[id] = [installCount, likeCount, viewCount]
  }
  await writeFile({ date, stats }, STATS_DATA_FILE_NAME)
  await writeFile({ date, stats }, `${date.slice(0, 10)}.json`)
}

const shieldsIoJson = {
  schemaVersion: 1,
  color: 'brightgreen'
}

async function writePlugins (plugins) {
  await fs.remove(path.join(DATA_DIRECTORY_NAME, PLUGINS_DIRECTORY_NAME))
  for (const { id, installCount, likeCount } of plugins) {
    await writeFile(
      {
        ...shieldsIoJson,
        label: 'installs',
        message: formatNumber(installCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, INSTALLS_DATA_FILE_NAME)
    )
    await writeFile(
      {
        ...shieldsIoJson,
        label: 'likes',
        message: formatNumber(likeCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, LIKES_DATA_FILE_NAME)
    )
  }
}

async function writePublishers (plugins) {
  await fs.remove(path.join(DATA_DIRECTORY_NAME, PUBLISHERS_DIRECTORY_NAME))
  const publishers = {}
  for (const { installCount, publisherHandle, likeCount } of plugins) {
    if (typeof publishers[publisherHandle] === 'undefined') {
      publishers[publisherHandle] = {
        installCount: 0,
        likeCount: 0
      }
    }
    publishers[publisherHandle].installCount += installCount
    publishers[publisherHandle].likeCount += likeCount
  }
  for (const publisherHandle of Object.keys(publishers)) {
    const publisher = publishers[publisherHandle]
    await writeFile(
      {
        ...shieldsIoJson,
        label: 'total installs',
        message: formatNumber(publisher.installCount)
      },
      path.join(
        PUBLISHERS_DIRECTORY_NAME,
        publisherHandle,
        INSTALLS_DATA_FILE_NAME
      )
    )
    await writeFile(
      {
        ...shieldsIoJson,
        label: 'total likes',
        message: formatNumber(publisher.likeCount)
      },
      path.join(
        PUBLISHERS_DIRECTORY_NAME,
        publisherHandle,
        LIKES_DATA_FILE_NAME
      )
    )
  }
}

async function writeFile (data, fileName) {
  const file = path.join(DATA_DIRECTORY_NAME, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

function formatNumber (number) {
  return Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    notation: 'compact',
    minimumFractionDigits: number > 999 && number < 100000 ? 1 : 0,
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.0', '')
}

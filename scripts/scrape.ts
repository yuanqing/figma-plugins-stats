import * as fs from 'fs-extra'
import * as path from 'path'

import { PluginData } from '../src/types.js'
import { fetchLivePluginsDataAsync } from '../src/utilities/fetch-live-plugins-data-async.js'

const DATA_DIRECTORY_NAME = 'data'
const META_DATA_FILE_NAME = 'index.json'
const STATS_DATA_FILE_NAME = 'stats.json'

const PUBLISHERS_DIRECTORY_NAME = 'publisher'
const PLUGINS_DIRECTORY_NAME = 'plugin'
const INSTALLS_DATA_FILE_NAME = 'installs.json'
const LIKES_DATA_FILE_NAME = 'likes.json'
const RUNS_DATA_FILE_NAME = 'runs.json'
const VIEWS_DATA_FILE_NAME = 'views.json'

async function main() {
  const date = new Date().toISOString()
  const plugins = await fetchLivePluginsDataAsync()
  await writeFileAsync({ date, plugins }, META_DATA_FILE_NAME)
  await writeStatsAsync(date, plugins)
  await writePluginsAsync(plugins)
  await writePublishersAsync(plugins)
}
main()

async function writeStatsAsync(
  date: string,
  plugins: Array<PluginData>
): Promise<void> {
  const stats: { [id: string]: [number, number, number, number] } = {}
  for (const { id, installCount, likeCount, runCount, viewCount } of plugins) {
    stats[id] = [installCount, likeCount, runCount, viewCount]
  }
  await writeFileAsync({ date, stats }, STATS_DATA_FILE_NAME)
  await writeFileAsync({ date, stats }, `${date.slice(0, 10)}.json`)
}

const shieldsIoJson = {
  color: 'brightgreen',
  schemaVersion: 1
}

async function writePluginsAsync(plugins: Array<PluginData>): Promise<void> {
  await fs.remove(path.join(DATA_DIRECTORY_NAME, PLUGINS_DIRECTORY_NAME))
  for (const { id, installCount, likeCount, runCount, viewCount } of plugins) {
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'installs',
        message: formatNumber(installCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, INSTALLS_DATA_FILE_NAME)
    )
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'likes',
        message: formatNumber(likeCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, LIKES_DATA_FILE_NAME)
    )
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'runs',
        message: formatNumber(runCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, RUNS_DATA_FILE_NAME)
    )
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'views',
        message: formatNumber(viewCount)
      },
      path.join(PLUGINS_DIRECTORY_NAME, id, VIEWS_DATA_FILE_NAME)
    )
  }
}

async function writePublishersAsync(plugins: Array<PluginData>): Promise<void> {
  await fs.remove(path.join(DATA_DIRECTORY_NAME, PUBLISHERS_DIRECTORY_NAME))
  const publishers: {
    [key: string]: {
      installCount: number
      likeCount: number
      runCount: number
      viewCount: number
    }
  } = {}
  for (const {
    installCount,
    likeCount,
    publisherHandle,
    runCount,
    viewCount
  } of plugins) {
    if (typeof publishers[publisherHandle] === 'undefined') {
      publishers[publisherHandle] = {
        installCount: 0,
        likeCount: 0,
        runCount: 0,
        viewCount: 0
      }
    }
    publishers[publisherHandle].installCount += installCount
    publishers[publisherHandle].likeCount += likeCount
    publishers[publisherHandle].runCount += runCount
    publishers[publisherHandle].viewCount += viewCount
  }
  for (const publisherHandle of Object.keys(publishers)) {
    const publisher = publishers[publisherHandle]
    await writeFileAsync(
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
    await writeFileAsync(
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
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'total runs',
        message: formatNumber(publisher.runCount)
      },
      path.join(PUBLISHERS_DIRECTORY_NAME, publisherHandle, RUNS_DATA_FILE_NAME)
    )
    await writeFileAsync(
      {
        ...shieldsIoJson,
        label: 'total views',
        message: formatNumber(publisher.viewCount)
      },
      path.join(
        PUBLISHERS_DIRECTORY_NAME,
        publisherHandle,
        VIEWS_DATA_FILE_NAME
      )
    )
  }
}

async function writeFileAsync(data: any, fileName: string): Promise<void> {
  const file = path.join(DATA_DIRECTORY_NAME, fileName)
  await fs.outputFile(file, `${JSON.stringify(data)}\n`, 'utf8')
}

function formatNumber(number: number): string {
  return Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    minimumFractionDigits: number > 999 && number < 100000 ? 1 : 0,
    notation: 'compact'
  } as Intl.NumberFormatOptions)
    .format(number)
    .replace('.0', '')
}

import { PluginData, RawPluginData } from '../types.js'
import { fetchAsync } from './fetch-async.js'

export async function fetchLivePluginsDataAsync(): Promise<Array<PluginData>> {
  const data = await fetchRawPluginsDataAsync()
  return parseRawPluginsData(data)
}

async function fetchRawPluginsDataAsync(): Promise<Array<RawPluginData>> {
  let result: any = []
  let url =
    '/api/plugins/browse?sort_order=desc&resource_type=plugins&page_size=50'
  while (typeof url !== 'undefined') {
    const response = await fetchAsync(`https://www.figma.com${url}`)
    const json: any = await response.json()
    result = result.concat(json.meta.plugins)
    url = json.pagination.next_page
  }
  return deduplicate(result)
}

function deduplicate(data: Array<RawPluginData>): Array<RawPluginData> {
  const result: Array<RawPluginData> = []
  const ids: { [id: string]: boolean } = {}
  for (const item of data) {
    const id = item.id
    if (ids[id] !== true) {
      result.push(item)
      ids[id] = true
    }
  }
  return result
}

function parseRawPluginsData(data: Array<RawPluginData>): Array<PluginData> {
  const plugins: Array<PluginData> = []
  for (const item of data) {
    const metaData = Object.values(item.versions)[0]
    plugins.push({
      description: metaData.description,
      id: item.id,
      installCount: item.install_count,
      lastUpdateDate: metaData.created_at,
      likeCount: item.like_count,
      name: metaData.name,
      publisherHandle: item.publisher.profile_handle,
      publisherId: item.publisher.id,
      publisherName: item.publisher.name,
      viewCount: item.view_count
    })
  }
  return plugins.sort(function (a: PluginData, b: PluginData) {
    return a.name.localeCompare(b.name)
  })
}

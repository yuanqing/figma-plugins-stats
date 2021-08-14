import test from 'ava'

import { PluginData } from '../src/types.js'
import { fetchLivePluginsDataAsync } from '../src/utilities/fetch-live-plugins-data-async.js'

test('fetches the stats of all public Figma plugins', async function (t) {
  t.plan(3)
  const plugins = await fetchLivePluginsDataAsync()
  t.true(Array.isArray(plugins) === true)
  t.true(plugins.length > 0)
  const result = plugins.find(function (plugin: PluginData) {
    if (plugin.publisherHandle === 'yuanqing') {
      return true
    }
  })
  t.true(typeof result !== 'undefined')
})

const test = require('ava')
const fetchFigmaPluginsStats = require('../src/index')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof fetchFigmaPluginsStats === 'function')
})

test('fetches the stats of all public Figma plugins', async function (t) {
  t.timeout(30000)
  t.plan(3)
  const plugins = await fetchFigmaPluginsStats()
  t.true(Array.isArray(plugins) === true)
  t.true(plugins.length > 0)
  const result = plugins.find(function (plugin) {
    if (plugin.publisherHandle === 'yuanqing') {
      return true
    }
  })
  t.true(typeof result !== 'undefined')
})

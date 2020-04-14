const test = require('ava')
const fetchPluginsData = require('../src/fetch-plugins-data')

test('fetches the latest meta data and stats of all public Figma plugins', async function (t) {
  t.plan(2)
  const pluginsData = await fetchPluginsData()
  t.true(Array.isArray(pluginsData.plugins))
  t.true(typeof pluginsData.orgsAndTeams !== 'undefined')
})

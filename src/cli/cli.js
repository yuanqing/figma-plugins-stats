#!/usr/bin/env node

const indentString = require('indent-string')
const sade = require('sade')
const figmaPluginsData = require('./figma-plugins-data')
const formatData = require('./format-data')
const log = require('./log')

sade('figma-plugins-data [handle]', true)
  .describe('Figma plugins meta data and stats')
  .example('')
  .example('yuanqing')
  .option('-l, --limit', 'Limit the number of plugins returned')
  .example('--limit 10')
  .option('-s, --sort', 'Sort order', 'installs')
  .example('--sort name')
  .example('--sort author')
  .example('--sort installs')
  .example('--sort installsDelta')
  .example('--sort likes')
  .example('--sort likesDelta')
  .example('--sort views')
  .example('--sort viewsDelta')
  .option('-t, --time', 'Number of days of historical data', 7)
  .example('--time 7')
  .action(async function (handle, { limit, sort, time }) {
    try {
      const data = await figmaPluginsData({
        authorHandle: handle,
        limit,
        sort,
        timeOffset: time
      })
      const string = formatData(data, { timeOffset: time })
      console.log(`\n${indentString(string, 2)}\n`)
    } catch (error) {
      log.error(error.message)
      process.exit(1)
    }
  })
  .parse(process.argv)

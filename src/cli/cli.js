#!/usr/bin/env node

const indentString = require('indent-string')
const sade = require('sade')
const figmaPluginsData = require('./figma-plugins-data')
const formatDate = require('./format-date')
const createTable = require('./create-table')
const log = require('./log')

sade('figma-plugins-data [handle]', true)
  .describe('Figma plugins meta data and stats')
  .option('-l, --limit', 'Limit the number of plugins returned')
  .option('-s, --sort', 'Sort order', 'installs')
  .option('-t, --time', 'Number of days of historical data', 7)
  .action(async function (handle, { limit, sort, time }) {
    try {
      const { plugins, totals, startDate } = await figmaPluginsData({
        authorHandle: handle,
        limit,
        sort,
        timeOffset: time
      })
      console.log()
      const date = formatDate(startDate)
      console.log(indentString(date, 2))
      console.log()
      const table = createTable({ plugins, totals })
      console.log(indentString(table, 2))
      console.log()
    } catch (error) {
      log.error(error.message)
      process.exit(1)
    }
  })
  .example('')
  .example('yuanqing')
  .example('--limit 10')
  .example('--sort name')
  .example('--sort author')
  .example('--sort installs')
  .example('--sort installsDelta')
  .example('--sort likes')
  .example('--sort likesDelta')
  .example('--sort views')
  .example('--sort viewsDelta')
  .example('--time 7')
  .parse(process.argv)

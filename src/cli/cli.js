#!/usr/bin/env node

const indentString = require('indent-string')
const ora = require('ora')
const sade = require('sade')
const figmaPluginsStats = require('./figma-plugins-stats')
const createDateTable = require('./utilities/create-date-table')
const createPluginsTable = require('./utilities/create-plugins-table')
const log = require('./utilities/log')

sade('figma-plugins-stats [handle]', true)
  .describe('Figma plugins meta data and stats')
  .option('-l, --limit', 'Limit the number of plugins returned')
  .option('-s, --sort', 'Set the sort order', 'installs-delta')
  .option('-t, --time', 'Set the period of historical data to show', '7d')
  .action(async function (handle, { limit, sort, time: timeOffset }) {
    const spinner = ora('Fetching stats')
    spinner.color = 'gray'
    try {
      spinner.start()
      const { plugins, totals, startDate, endDate } = await figmaPluginsStats({
        handle,
        limit,
        sort,
        timeOffset
      })
      spinner.stop()
      console.log()
      const date = createDateTable(startDate, endDate)
      console.log(indentString(date, 2))
      console.log()
      const table = createPluginsTable({ plugins, totals })
      console.log(indentString(table, 2))
      console.log()
    } catch (error) {
      spinner.stop()
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
  .example('--sort installs-delta')
  .example('--sort likes')
  .example('--sort likes-delta')
  // FIXME
  // .example('--sort views')
  // .example('--sort views-delta')
  .example('--time 1d')
  .parse(process.argv)

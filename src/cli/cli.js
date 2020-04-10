#!/usr/bin/env node

const indentString = require('indent-string')
const ora = require('ora')
const sade = require('sade')
const figmaPluginsStats = require('./figma-plugins-stats')
const formatDate = require('./utilities/format-date')
const createTable = require('./utilities/create-table')
const log = require('./utilities/log')

sade('figma-plugins-stats [handle]', true)
  .describe('Figma plugins meta data and stats')
  .option('-l, --limit', 'Limit the number of plugins returned')
  .option('-s, --sort', 'Set the sort order', 'installs')
  .option('-t, --time', 'Set the number of days of historical data to show', 7)
  .action(async function (handle, { limit, sort, time }) {
    try {
      const spinner = ora('Fetching stats')
      spinner.color = 'gray'
      spinner.start()
      const { plugins, totals, startDate } = await figmaPluginsStats({
        handle,
        limit,
        sort,
        timeOffset: time
      })
      spinner.stop()
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

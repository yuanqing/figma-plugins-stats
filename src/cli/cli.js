#!/usr/bin/env node

const sade = require('sade')
const figmaPluginsData = require('./figma-plugins-data')
const formatData = require('./format-data')
const log = require('./log')

sade('figma-plugins-data [handle]', true)
  .option('-n, --number', 'Limit the number of plugins returned')
  .option('-s, --sort', 'Sort order', 'installs')
  .option('-t, --time', 'Time offset', 7)
  .action(async function (handle, { number, sort, time }) {
    try {
      const data = await figmaPluginsData({
        authorHandle: handle,
        limit: number,
        sort,
        timeOffset: time
      })
      console.log(formatData(data, { timeOffset: time }))
    } catch (error) {
      log.error(error.message)
      process.exit(1)
    }
  })
  .parse(process.argv)

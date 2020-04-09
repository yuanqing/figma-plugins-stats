#!/usr/bin/env node

const sade = require('sade')
const figmaPluginsData = require('./figma-plugins-data')
const formatData = require('./format-data')

sade('figma-plugins-data [handle]', true)
  .option('-t, --time', 'Time offset', 7)
  .option('-s, --sort', 'Sort order', 7)
  .action(async function (handle, { time, sort }) {
    const data = await figmaPluginsData({
      authorHandle: handle,
      sort,
      timeOffset: time
    })
    console.log(formatData(data, { timeOffset: time }))
  })
  .parse(process.argv)

#!/usr/bin/env node

const sade = require('sade')
const figmaPluginsData = require('./figma-plugins-data')
const formatData = require('./format-data')

sade('figma-plugins-data [handle]', true)
  .option('-t, --time', 'Time offset', 7)
  .action(async function (handle, { time }) {
    const data = await figmaPluginsData({
      authorHandle: handle,
      timeOffset: time
    })
    console.log(formatData(data, { timeOffset: time }))
  })
  .parse(process.argv)

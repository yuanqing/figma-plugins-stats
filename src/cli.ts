#!/usr/bin/env node
/* eslint-disable no-console */

import { createCli } from '@yuanqing/cli'
import { readFileSync } from 'fs'
import indentString from 'indent-string'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { fetchFigmaPluginsStatsAsync } from './fetch-figma-plugins-stats-async.js'
import { CliOptions, CliPositionals } from './types.js'
import { createDateTable } from './utilities/create-date-table.js'
import { createPluginsTable } from './utilities/create-plugins-table.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8')
)

const cliConfig = {
  name: packageJson.name,
  version: packageJson.version
}

const commandConfig = {
  description: `${packageJson.description}.`,
  examples: [
    '| less -r',
    'yuanqing',
    '--limit 10',
    '--sort name',
    '--sort publisher',
    '--sort installs',
    '--sort installs-delta',
    '--sort likes',
    '--sort likes-delta',
    '--sort views',
    '--sort views-delta',
    '--time 7d',
    '--time 2w'
  ],
  options: [
    {
      aliases: ['l'],
      default: -1,
      description: 'Limit the number of plugins returned.',
      name: 'limit',
      type: 'NON_ZERO_POSITIVE_INTEGER'
    },
    {
      aliases: ['s'],
      default: 'installs-delta',
      description:
        "Set the sort order. One of 'name', 'publisher', 'installs', 'installs-delta', 'likes', 'likes-delta', 'views' or 'views-delta'. Defaults to 'installs-delta'.",
      name: 'sort',
      type: [
        'name',
        'publisher',
        'installs',
        'installs-delta',
        'likes',
        'likes-delta',
        'views',
        'views-delta'
      ]
    },
    {
      aliases: ['t'],
      default: '7d',
      description:
        "Set the period of historical data to show. Defaults to '7d'.",
      name: 'time',
      type: 'STRING'
    }
  ],
  positionals: [
    {
      default: null,
      description: 'A Figma profile handle.',
      name: 'handle',
      type: 'STRING'
    }
  ]
}

async function main() {
  try {
    const result = createCli(cliConfig, commandConfig)(process.argv.slice(2))
    if (typeof result !== 'undefined') {
      const positionals = result.positionals as CliPositionals
      const options = result.options as CliOptions
      const { plugins, totals, startDate, endDate } =
        await fetchFigmaPluginsStatsAsync({
          handle: positionals.handle,
          limit: options.limit,
          sort: options.sort,
          timeOffset: options.time
        })
      console.log()
      const dateTable = createDateTable(startDate, endDate)
      console.log(indentString(dateTable, 2))
      console.log()
      const pluginsTable = createPluginsTable({ plugins, totals })
      console.log(indentString(pluginsTable, 2))
      console.log()
    }
  } catch (error) {
    console.error(`${packageJson.name}: ${error.message}`)
    process.exit(1)
  }
}
main()

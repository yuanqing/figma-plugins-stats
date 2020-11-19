import kleur from 'kleur'
import sparkly from 'sparkly'
import stripAnsi from 'strip-ansi'
import textTable from 'text-table'

import { Plugin } from '../types'
import { pluginStatsKeys } from './plugins-stats-keys'

export function createPluginsTable({
  plugins,
  totals
}: {
  plugins: Array<Plugin>
  totals: any
}): string {
  const headers = [
    kleur.gray('no'),
    kleur.gray(' name'),
    kleur.gray(' publisher'),
    kleur.gray(' installs'),
    '',
    kleur.gray(' likes'),
    '',
    kleur.gray(' views'),
    ''
  ]
  const rows = [headers]
  plugins.forEach(function (plugin: Plugin, index: number) {
    const row: Array<string> = [
      `${index + 1}`,
      ` ${plugin.name.trim()}`,
      ` ${plugin.publisher.trim()}`
    ]
    for (const key of pluginStatsKeys) {
      const count = plugin[key]
      row.push(` ${sparkly(count.deltas)} ${count.count.toLocaleString()}`)
      row.push(formatDelta(count.totalDelta))
    }
    rows.push(row)
  })
  const totalRow = [
    '',
    '',
    kleur.gray(' totals'),
    ` ${sparkly(
      totals.installCount.deltas
    )} ${totals.installCount.count.toLocaleString()}`,
    formatDelta(totals.installCount.totalDelta),
    ` ${sparkly(
      totals.likeCount.deltas
    )} ${totals.likeCount.count.toLocaleString()}`,
    formatDelta(totals.likeCount.totalDelta),
    ` ${sparkly(
      totals.viewCount.deltas
    )} ${totals.viewCount.count.toLocaleString()}`,
    formatDelta(totals.viewCount.totalDelta)
  ]
  rows.push([])
  rows.push(totalRow)
  return textTable(rows, {
    hsep: ' ',
    stringLength: function (string: any) {
      return stripAnsi(string).length
    }
  })
}

function formatDelta(delta: number): string {
  if (delta < 0) {
    return kleur.red(`↓${Math.abs(delta).toLocaleString()}`)
  }
  if (delta > 0) {
    return kleur.green(`↑${delta.toLocaleString()}`)
  }
  return ''
}

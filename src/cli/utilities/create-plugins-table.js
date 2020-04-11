const kleur = require('kleur')
const sparkly = require('sparkly')
const stripAnsi = require('strip-ansi')
const textTable = require('text-table')

const keys = [
  'installCount',
  'likeCount'
  // FIXME
  // 'viewCount'
]

function createPluginsTable ({ plugins, totals }) {
  const headers = [
    kleur.gray('no'),
    kleur.gray(' name'),
    kleur.gray(' author'),
    kleur.gray(' installs'),
    '',
    kleur.gray(' likes'),
    ''
    // FIXME
    // kleur.gray(' views'),
    // ''
  ]
  const rows = [headers]
  plugins.forEach(function (plugin, index) {
    const row = [
      index + 1,
      ` ${plugin.name.trim()}`,
      ` ${plugin.author.trim()}`
    ]
    for (const key of keys) {
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
    formatDelta(totals.likeCount.totalDelta)
    // FIXME
    // ` ${sparkly(
    //   totals.viewCount.deltas
    // )} ${totals.viewCount.count.toLocaleString()}`,
    // formatDelta(totals.viewCount.totalDelta)
  ]
  rows.push([])
  rows.push(totalRow)
  return textTable(rows, {
    hsep: ' ',
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

function formatDelta (delta) {
  if (delta < 0) {
    return kleur.red(`↓${Math.abs(delta).toLocaleString()}`)
  }
  if (delta > 0) {
    return kleur.green(`↑${delta.toLocaleString()}`)
  }
  return ''
}

module.exports = createPluginsTable

const table = require('text-table')
const kleur = require('kleur')
const sparkly = require('sparkly')
const stripAnsi = require('strip-ansi')

const keys = ['installCount', 'likeCount', 'viewCount']

function formatData (plugins, totals) {
  const headers = [
    kleur.gray('no'),
    kleur.gray(' name'),
    kleur.gray(' author'),
    kleur.gray(' installs'),
    '',
    kleur.gray(' likes'),
    '',
    kleur.gray(' views'),
    ''
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
      row.push(
        count.totalDelta > 0
          ? kleur.green(`↑${count.totalDelta.toLocaleString()}`)
          : ''
      )
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
    kleur.green(`↑${totals.installCount.totalDelta.toLocaleString()}`),
    ` ${sparkly(
      totals.likeCount.deltas
    )} ${totals.likeCount.count.toLocaleString()}`,
    kleur.green(`↑${totals.likeCount.totalDelta.toLocaleString()}`),
    ` ${sparkly(
      totals.viewCount.deltas
    )} ${totals.viewCount.count.toLocaleString()}`,
    kleur.green(`↑${totals.viewCount.totalDelta.toLocaleString()}`)
  ]
  rows.push(totalRow)
  return table(rows, {
    hsep: ' ',
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

module.exports = formatData

const table = require('text-table')
const kleur = require('kleur')
const sparkly = require('sparkly')
const stripAnsi = require('strip-ansi')

const keys = ['installCount', 'likeCount', 'viewCount']

function formatData (data) {
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
  data.forEach(function (plugin, index) {
    const row = [
      index + 1,
      ` ${plugin.name.trim()}`,
      ` ${plugin.author.trim()}`
    ]
    for (const key of keys) {
      const count = plugin[key]
      row.push(
        ` ${sparkly(count.deltas)} ${count.currentCount.toLocaleString()}`
      )
      row.push(
        count.totalDelta > 0
          ? kleur.green(`↑${count.totalDelta.toLocaleString()}`)
          : ''
      )
    }
    rows.push(row)
  })
  return table(rows, {
    hsep: ' ',
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

module.exports = formatData

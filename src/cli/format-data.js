const table = require('text-table')
const kleur = require('kleur')
const sparkly = require('sparkly')
const stripAnsi = require('strip-ansi')

const keys = ['installCount', 'likeCount', 'viewCount']

function formatData (data, { timeOffset }) {
  const showSparklines = timeOffset > 1
  const rows = [createHeaders(showSparklines)]
  data.forEach(function (plugin, index) {
    const row = [
      index + 1,
      ` ${plugin.name.trim()}`,
      ` ${plugin.author.trim()}`
    ]
    for (const key of keys) {
      const count = plugin[key]
      row.push(
        `${
          showSparklines === true ? ` ${sparkly(count.deltas)}` : ''
        } ${count.currentCount.toLocaleString()}`
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

const NUMBER = kleur.gray('no')
const PLUGIN_NAME = kleur.gray(' name')
const AUTHOR = kleur.gray(' author')
const INSTALLS = kleur.gray(' installs')
const LIKES = kleur.gray(' likes')
const VIEWS = kleur.gray(' views')

function createHeaders (showSparklines) {
  return showSparklines
    ? [NUMBER, PLUGIN_NAME, AUTHOR, INSTALLS, '', LIKES, '', VIEWS, '']
    : [NUMBER, PLUGIN_NAME, AUTHOR, INSTALLS, '', LIKES, '', VIEWS, '']
}

module.exports = formatData

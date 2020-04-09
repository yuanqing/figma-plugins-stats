const table = require('text-table')
const emojiRegex = require('emoji-regex/text.js')
const kleur = require('kleur')
const sparkly = require('sparkly')
const stripAnsi = require('strip-ansi')

const keys = ['installCount', 'likeCount', 'viewCount']

function formatData (data, { timeOffset }) {
  const showSparklines = timeOffset > 1
  const rows = [createHeaders(timeOffset)]
  data.forEach(function (plugin) {
    const row = [sanitizePluginName(plugin.name)]
    for (const key of keys) {
      const count = plugin[key]
      row.push(count.currentCount.toLocaleString())
      const plusSign = count.totalDelta > 0 ? '+' : ''
      row.push(`(${plusSign}${count.totalDelta})`)
      if (showSparklines === true) {
        row.push(sparkly(count.deltas))
      }
    }
    rows.push(row)
  })
  return table(rows, {
    align: showSparklines
      ? ['l', 'r', 'l', 'l', 'r', 'l', 'l', 'r', 'l', 'l']
      : ['l', 'r', 'l', 'r', 'l', 'r', 'l'],
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

const PLUGIN_NAME = kleur.gray('plugin name')
const INSTALLS = kleur.green('installs')
const LIKES = kleur.magenta('likes')
const VIEWS = kleur.cyan('views')

function createHeaders (showSparklines) {
  return showSparklines
    ? [PLUGIN_NAME, INSTALLS, '', '', LIKES, '', '', VIEWS, '', '']
    : [PLUGIN_NAME, INSTALLS, '', LIKES, '', VIEWS, '']
}

const regex = emojiRegex()
function sanitizePluginName (string) {
  return string.replace(regex, '').trim()
}

module.exports = formatData

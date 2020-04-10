const differenceInMilliseconds = require('date-fns/differenceInMilliseconds')
const dateTime = require('date-time')
const kleur = require('kleur')
const ms = require('ms')
const stripAnsi = require('strip-ansi')
const table = require('text-table')

function formatDate (startDate) {
  const now = new Date()
  const difference = differenceInMilliseconds(now, startDate)
  const rows = [
    [kleur.gray('from'), dateTime({ date: startDate, showTimeZone: true })],
    [kleur.gray('to'), dateTime({ date: now, showTimeZone: true })],
    [kleur.gray('period'), ms(difference)]
  ]
  return table(rows, {
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

module.exports = formatDate

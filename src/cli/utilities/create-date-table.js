const differenceInMilliseconds = require('date-fns/differenceInMilliseconds')
const dateTime = require('date-time')
const kleur = require('kleur')
const ms = require('ms')
const stripAnsi = require('strip-ansi')
const textTable = require('text-table')

function createDateTable (startDate, endDate) {
  const difference = differenceInMilliseconds(endDate, startDate)
  const rows = [
    [kleur.gray('period'), ms(difference)],
    [kleur.gray('from'), dateTime({ date: startDate, showTimeZone: true })],
    [kleur.gray('to'), dateTime({ date: endDate, showTimeZone: true })]
  ]
  return textTable(rows, {
    stringLength: function (string) {
      return stripAnsi(string).length
    }
  })
}

module.exports = createDateTable

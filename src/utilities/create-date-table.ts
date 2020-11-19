import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import dateTime from 'date-time'
import kleur from 'kleur'
import ms from 'ms'
import stripAnsi from 'strip-ansi'
import textTable from 'text-table'

export function createDateTable(startDate: Date, endDate: Date): string {
  const difference = differenceInMilliseconds(endDate, startDate)
  const rows = [
    [kleur.gray('period'), ms(difference)],
    [kleur.gray('from'), dateTime({ date: startDate, showTimeZone: true })],
    [kleur.gray('to'), dateTime({ date: endDate, showTimeZone: true })]
  ]
  return textTable(rows, {
    stringLength: function (string: any) {
      return stripAnsi(string).length
    }
  })
}

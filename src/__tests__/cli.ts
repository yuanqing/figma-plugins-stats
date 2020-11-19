import * as childProcess from 'child_process'
import * as path from 'path'
import { test } from 'tap'

test('runs and exits without error', async function (t) {
  t.plan(1)
  const cliPath = path.resolve(__dirname, '..', 'cli.ts')
  await new Promise(function (resolve, reject) {
    childProcess.exec(`ts-node ${cliPath}`, function (error) {
      if (error) {
        t.fail()
        reject(error)
      }
      t.pass()
      resolve()
    })
  })
})

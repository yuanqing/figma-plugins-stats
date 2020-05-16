const childProcess = require('child_process')
const path = require('path')
const test = require('ava')

test('runs and exits without error', async function (t) {
  t.timeout(30000)
  t.plan(1)
  const cli = path.resolve(__dirname, '..', 'src', 'cli.js')
  await new Promise(function (resolve, reject) {
    childProcess.exec(`node ${cli}`, function (error) {
      if (error) {
        t.fail()
        reject(error)
      }
      t.pass()
      resolve()
    })
  })
})

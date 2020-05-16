const test = require('ava')
const path = require('path')
const { exec } = require('child_process')

test('runs and exits without error', async function (t) {
  t.timeout(30000)
  t.plan(1)
  const cli = path.resolve(__dirname, '..', 'src', 'cli.js')
  await new Promise(function (resolve, reject) {
    exec(`node ${cli}`, function (error) {
      if (error) {
        t.fail()
        reject(error)
      }
      t.pass()
      resolve()
    })
  })
})

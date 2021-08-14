import test from 'ava'
import { exec } from 'child_process'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

test('runs and exits without error', async function (t) {
  t.plan(1)
  const cliPath = resolve(__dirname, '..', 'src', 'cli.ts')
  await new Promise<void>(function (resolve, reject) {
    exec(`node --loader ts-node/esm ${cliPath}`, function (error) {
      if (error) {
        t.fail()
        reject(error)
      }
      t.pass()
      resolve()
    })
  })
})

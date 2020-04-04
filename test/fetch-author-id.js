const test = require('ava')
const fetchAuthorId = require('../src/fetch-author-id')

test('fetches the `authorId` of the given `handle`', async function (t) {
  t.plan(2)
  const authorId = await fetchAuthorId('yuanqing')
  t.true(typeof authorId === 'string')
  t.deepEqual(authorId, '720504066012413623')
})

test('throws if `handle` is invalid', async function (t) {
  t.plan(2)
  const error = await t.throwsAsync(async function () {
    await fetchAuthorId('INVALID_FIGMA_HANDLE')
  })
  t.truthy(error.message)
})

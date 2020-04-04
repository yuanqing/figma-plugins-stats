const fetch = require('./utilities/fetch')

async function fetchAuthorId (authorHandle) {
  const response = await fetch(
    `https://www.figma.com/api/profile_handle/${authorHandle}`
  )
  const json = await response.json()
  if (json.error === true) {
    throw new Error('Invalid author handle')
  }
  return json.meta.user_profile.id
}

module.exports = fetchAuthorId

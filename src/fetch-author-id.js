const fetch = require('./utilities/fetch')

async function fetchAuthorId (profileHandle) {
  const response = await fetch(
    `https://www.figma.com/api/profile_handle/${profileHandle}`
  )
  const json = await response.json()
  if (json.error === true) {
    throw new Error('Invalid user handle')
  }
  const meta = json.meta
  if (typeof meta.org_profile !== 'undefined') {
    return meta.org_profile.id
  }
  if (typeof meta.team_profile !== 'undefined') {
    return meta.team_profile.id
  }
  if (typeof meta.user_profile !== 'undefined') {
    return meta.user_profile.id
  }
  throw new Error('Invalid user handle')
}

module.exports = fetchAuthorId

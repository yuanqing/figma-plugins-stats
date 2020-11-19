import fetch, { Response } from 'node-fetch'

export function fetchAsync(url: string): Promise<Response> {
  return fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

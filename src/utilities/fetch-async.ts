import fetch, { Response } from 'node-fetch'

export function fetchAsync(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

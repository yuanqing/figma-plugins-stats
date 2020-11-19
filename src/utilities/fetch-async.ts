import unfetch from 'isomorphic-unfetch'

export function fetchAsync(url: string): Promise<Response> {
  return unfetch(
    typeof window === 'undefined'
      ? url
      : `https://cors-anywhere.herokuapp.com/${url}`
  )
}

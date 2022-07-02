export type CliPositionals = {
  handle: string
}
export type CliOptions = {
  limit: number
  sort: SortKey
  time: string
}

export type RawPluginData = {
  id: string
  versions: {
    [key: string]: {
      name: string
      description: string
      created_at: string
    }
  }
  publisher: {
    profile_handle: string
    id: string
    name: string
  }
  install_count: number
  like_count: number
  unique_run_count: number
  view_count: number
}

export interface PluginData extends PluginStats {
  id: string
  name: string
  description: string
  lastUpdateDate: string
  publisherHandle: string
  publisherId: string
  publisherName: string
}
export interface PluginStats {
  installCount: number
  likeCount: number
  runCount: number
  viewCount: number
}

export interface Plugin extends Counts {
  name: string
  publisher: string
}
export interface Counts {
  installCount: Count
  likeCount: Count
  runCount: Count
  viewCount: Count
}
export type Count = {
  count: number
  deltas: Array<number>
  totalDelta: number
}

export type SortKey =
  | 'name'
  | 'publisher'
  | 'installs'
  | 'installs-delta'
  | 'likes'
  | 'likes-delta'
  | 'runs'
  | 'runs-delta'
  | 'views'
  | 'views-delta'

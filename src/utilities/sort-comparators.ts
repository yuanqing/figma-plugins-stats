import { Plugin, SortKey } from '../types.js'

export const sortComparators: {
  [key in SortKey]: (a: Plugin, b: Plugin) => number
} = {
  'installs': function (a: Plugin, b: Plugin) {
    return b.installCount.count - a.installCount.count
  },
  'installs-delta': function (a: Plugin, b: Plugin) {
    return b.installCount.totalDelta - a.installCount.totalDelta
  },
  'likes': function (a: Plugin, b: Plugin) {
    return b.likeCount.count - a.likeCount.count
  },
  'likes-delta': function (a: Plugin, b: Plugin) {
    return b.likeCount.totalDelta - a.likeCount.totalDelta
  },
  'name': function (a: Plugin, b: Plugin) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  },
  'publisher': function (a: Plugin, b: Plugin) {
    return a.publisher.toLowerCase().localeCompare(b.publisher.toLowerCase())
  },
  'views': function (a: Plugin, b: Plugin) {
    return b.viewCount.count - a.viewCount.count
  },
  'views-delta': function (a: Plugin, b: Plugin) {
    return b.viewCount.totalDelta - a.viewCount.totalDelta
  }
}

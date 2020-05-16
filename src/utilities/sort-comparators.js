module.exports = {
  name: function (a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  },
  publisher: function (a, b) {
    return a.publisher.toLowerCase().localeCompare(b.publisher.toLowerCase())
  },
  installs: function (a, b) {
    return b.installCount.count - a.installCount.count
  },
  'installs-delta': function (a, b) {
    return b.installCount.totalDelta - a.installCount.totalDelta
  },
  likes: function (a, b) {
    return b.likeCount.count - a.likeCount.count
  },
  'likes-delta': function (a, b) {
    return b.likeCount.totalDelta - a.likeCount.totalDelta
  }
  // FIXME
  // views: function (a, b) {
  //   return b.viewCount.count - a.viewCount.count
  // },
  // 'views-delta': function (a, b) {
  //   return b.viewCount.totalDelta - a.viewCount.totalDelta
  // }
}

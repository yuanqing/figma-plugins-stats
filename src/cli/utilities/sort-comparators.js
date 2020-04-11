module.exports = {
  name: function (a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  },
  author: function (a, b) {
    return a.author.toLowerCase().localeCompare(b.author.toLowerCase())
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
  },
  views: function (a, b) {
    return b.viewCount.count - a.viewCount.count
  },
  'views-delta': function (a, b) {
    return b.viewCount.totalDelta - a.viewCount.totalDelta
  }
}

module.exports = {
  name: function (a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  },
  author: function (a, b) {
    return a.author.toLowerCase().localeCompare(b.author.toLowerCase())
  },
  installs: function (a, b) {
    return b.installCount.currentCount - a.installCount.currentCount
  },
  installsDelta: function (a, b) {
    return b.installCount.totalDelta - a.installCount.totalDelta
  },
  likes: function (a, b) {
    return b.likeCount.currentCount - a.likeCount.currentCount
  },
  likesDelta: function (a, b) {
    return b.likeCount.totalDelta - a.likeCount.totalDelta
  },
  views: function (a, b) {
    return b.viewCount.currentCount - a.viewCount.currentCount
  },
  viewsDelta: function (a, b) {
    return b.viewCount.totalDelta - a.viewCount.totalDelta
  }
}

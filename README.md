# figma-plugins-stats [![npm Version](https://badgen.net/npm/v/figma-plugins-stats)](https://www.npmjs.com/package/figma-plugins-stats) [![build](https://github.com/yuanqing/figma-plugins-stats/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-stats/actions?query=workflow%3Abuild)

> [Figma plugins](https://www.figma.com/community) meta data and stats

## Quick start

```
$ npx figma-plugins-stats tom

  period  7d
  from    2020-04-04 14:05:31 UTC+8
  to      2020-04-11 14:52:32 UTC+8

  no  name                author     installs              likes             views
  1   Status Annotations  Tom Lowry  ▃▂█▄▅▃▂▁ 999    ↑421  ▆▆██▇▂▁▁ 83  ↑26  ▇▄█▄▄▂▄▁ 2,066  ↑753
  2   Themer              Tom Lowry  ▆▅█▆▇▇▅▁ 10,193 ↑199  ▁▁▄█▄▁▁▁ 108 ↑4   ▁▂▅▄▄▃█▁ 4,934  ↑289
  3   Component Page      Tom Lowry  █▅██▅▅▆▁ 3,222  ↑110  ▁▁█▁▄▁▁▁ 51  ↑3   ▂▃▂█▄▄▁▁ 1,564  ↑79
  4   Sorter              Tom Lowry  ▄▅▆▄█▅▇▁ 3,743  ↑76   ▁▁█▁▁▁▁▁ 38  ↑1   ▂▁▂▁▄▂█▁ 684    ↑39
  5   Dice                Tom Lowry  ▂▁▆▆▆▄█▁ 251    ↑55   ▁▃▁▁▆▁█▁ 15  ↑6   ▃▅█▆▃▆▂▁ 304    ↑38
  6   Nester              Tom Lowry  ▂▁▂█▁▃▅▁ 564    ↑21   ▁▁██▁▁▁▁ 30  ↑2   ▁▁▁▂▁▂█▂ 1,007  ↑55
  7   Edit in place       Tom Lowry  ▄▂██▆▂▆▁ 874    ↑18   ▁▁▁▁▁▁█▁ 17  ↑1   ▁▁▁▁▁▁█▁ 238    ↑14
  8   Send to Top         Tom Lowry  █▃▆▆█▆▆▁ 1,822  ↑15   ▁▁█▁█▁▁▁ 4   ↑2   ▁▁▁▁▁██▁ 43     ↑2

                          totals     ▄▃█▆▆▅▄▁ 21,668 ↑915  ▃▄█▆▇▁▃▁ 346 ↑45  ▆▄█▆▅▄█▂ 10,840 ↑1,269

```

## CLI

```
$ npx figma-plugins-stats --help

  Description
    Figma plugins meta data and stats

  Usage
    $ figma-plugins-stats [handle] [options]

  Options
    -l, --limit      Limit the number of plugins returned
    -s, --sort       Set the sort order  (default installs-delta)
    -t, --time       Set the period of historical data to show  (default 7d)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ figma-plugins-stats
    $ figma-plugins-stats yuanqing
    $ figma-plugins-stats --limit 10
    $ figma-plugins-stats --sort name
    $ figma-plugins-stats --sort author
    $ figma-plugins-stats --sort installs
    $ figma-plugins-stats --sort installs-delta
    $ figma-plugins-stats --sort likes
    $ figma-plugins-stats --sort likes-delta
    $ figma-plugins-stats --sort views
    $ figma-plugins-stats --sort views-delta
    $ figma-plugins-stats --time 1d

```

## API

```js
const { fetchAuthorId, fetchPluginsData } = require('figma-plugins-stats')
```

#### const authorId = await fetchAuthorId([authorHandle])

Fetches the `authorId` of the given `authorHandle`.

#### const pluginsData = await fetchPluginsData()

Fetches the latest meta data and stats of all public Figma plugins. Each object literal in the `pluginsData` array has the following keys:

- `id`
- `name`
- `description`
- `lastUpdateDate`
- `tags`
- `authorId`
- `authorName`
- `installCount`
- `likeCount`
- `viewCount`

## Installation

```sh
$ yarn global add figma-plugins-stats
```

## License

[MIT](LICENSE.md)

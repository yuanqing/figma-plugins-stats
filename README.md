# figma-plugins-data [![npm Version](https://badgen.net/npm/v/figma-plugins-data)](https://www.npmjs.com/package/figma-plugins-data) [![build](https://github.com/yuanqing/figma-plugins-data/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-data/actions?query=workflow%3Abuild)

> [Figma plugins](https://www.figma.com/community) meta data and stats

## Quick start

```
$ npx figma-plugins-data tom

  period  7d
  from    2020-04-03 14:04:58 UTC+8
  to      2020-04-10 18:33:14 UTC+8

  no  name                author     installs                likes             views
  1   Themer              Tom Lowry  ▆▆▅█▆▇▇▁ 10,176 ↑209    ▁▁▁▄█▄▁▁ 108 ↑4   ▇▂▃██▇▆▂ 4,842  ↑236
  2   Sorter              Tom Lowry  ▆▄▅▆▄█▅▁ 3,730  ↑75     ▁▁▁█▁▁▁▁ 38  ↑1   ▃▃▂▃▂█▄▁ 668    ↑26
  3   Component Page      Tom Lowry  ▆█▅██▅▅▂ 3,211  ↑114    ▁▁▁█▁▄▁▁ 51  ↑3   ▃▂▃▂█▄▄▁ 1,563  ↑87
  4   Send to Top         Tom Lowry  ██▃▆▆█▆▁ 1,820  ↑16     ▁▁▁█▁█▁▁ 4   ↑2   ▁▁▁▁▁▁█▁ 42     ↑1
  5   Status Annotations  Tom Lowry  █▃▂█▄▄▃▁ 982    ↑558    █▃▃▄▄▃▁▁ 83  ↑41  █▄▂▄▂▂▁▁ 1,957  ↑1,032
  6   Edit in place       Tom Lowry  ▂▄▂██▆▂▁ 871    ↑16     ▁▁▁▁▁▁▁▁ 16       ▁█▁██▁▁▁ 227    ↑3
  7   Nester              Tom Lowry  ▃▂▁▂█▁▃▁ 559    ↑19     ▁▁▁██▁▁▁ 30  ↑2   ▇▃▃▁█▄▆▁ 971    ↑25
  8   Dice                Tom Lowry  ▄▃▁███▅▁ 236    ↑44     ▁▁▄▁▁█▁▁ 12  ↑3   ▂▃▅█▆▃▆▁ 302    ↑38

                          totals     █▄▃█▆▆▅▁ 21,585 ↑1,051  █▃▃▇▅▆▁▁ 342 ↑56  █▄▂▅▄▃▂▁ 10,572 ↑1,448

```

## CLI

```
$ npx figma-plugins-data --help

  Description
    Figma plugins meta data and stats

  Usage
    $ figma-plugins-data [handle] [options]

  Options
    -l, --limit      Limit the number of plugins returned
    -s, --sort       Sort order  (default installs)
    -t, --time       Number of days of historical data  (default 7)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ figma-plugins-data
    $ figma-plugins-data yuanqing
    $ figma-plugins-data --limit 10
    $ figma-plugins-data --sort name
    $ figma-plugins-data --sort author
    $ figma-plugins-data --sort installs
    $ figma-plugins-data --sort installsDelta
    $ figma-plugins-data --sort likes
    $ figma-plugins-data --sort likesDelta
    $ figma-plugins-data --sort views
    $ figma-plugins-data --sort viewsDelta
    $ figma-plugins-data --time 7

```

## API

```js
const { fetchAuthorId, fetchPluginsData } = require('figma-plugins-data')
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
$ yarn global add figma-plugins-data
```

## License

[MIT](LICENSE.md)

# figma-plugins-data [![npm Version](https://badgen.net/npm/v/figma-plugins-data)](https://www.npmjs.com/package/figma-plugins-data) [![build](https://github.com/yuanqing/figma-plugins-data/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-data/actions?query=workflow%3Abuild)

> [Figma plugins](https://www.figma.com/community) meta data and stats

## Quick start

```
$ npx figma-plugins-data yuanqing

  no  name                       author         installs               likes            views
  1   Clean Document             Yuan Qing Lim  ██▇▅▆██ 21,599 ↑1,056  ▃█▇▂▄▄▂ 290 ↑23  █▇▇▄▅▇█ 13,566 ↑870
  2   Sort Layers                Yuan Qing Lim  ▅██▇▂▅▁ 1,519  ↑41     ▁▁▁▁▁▁█ 19  ↑1   ▆█▄▂▄▆▄ 451    ↑17
  3   Insert Big Image           Yuan Qing Lim  ▂▂█▂▂▄▃ 1,065  ↑105    ▁█▁▁█▁▁ 32  ↑2   ▃▅▆▂▃▅█ 956    ↑73
  4   Component Utilities        Yuan Qing Lim  ▂▆█▄▅█▄ 1,039  ↑38     ▁▁█▁▁▁█ 31  ↑2   ▄▂▇▂▁▄█ 817    ↑39
  5   Language Tester            Yuan Qing Lim  ▁▄▄█▂▄▇ 1,024  ↑15     ▁▁▁▁▁█▁ 17  ↑1   █▆▃▃▆▃▄ 362    ↑23
  6   Organize Layers            Yuan Qing Lim  ▅▄█▂▄▇▃ 962    ↑46     ▁█▁▁▁▁▁ 32  ↑2   █▆█▄▂▆█ 395    ↑21
  7   Distribute Layers          Yuan Qing Lim  ▁▂██▂▂▁ 701    ↑13     ▁▁▁▁▁▁▁ 6        ▁▁█▁▁▁▁ 72     ↑1
  8   Move Layers                Yuan Qing Lim  ▁▂▆██▂▁ 686    ↑13     ▁▁▁▁▁▁▁ 6        ▄▂▂▁██▂ 117    ↑13
  9   Select Layers              Yuan Qing Lim  ▆█▆▃▂▆▆ 621    ↑38     ▁▁▁▁█▁█ 21  ↑2   ▂▅▂▁▁▂█ 252    ↑27
  10  Format Currency            Yuan Qing Lim  ▁▆▆█▂▃▂ 586    ↑18     ▁▁▁▁▁▁▁ 11       ▁▄▁▄▄█▁ 196    ↑5
  11  Draw Slice Over Selection  Yuan Qing Lim  ▁▄▆█▄▂▂ 575    ↑12     ▁▁▁▁▁▁▁ 3        ███▁▁▁▁ 68     ↑3
  12  Draw Mask Under Selection  Yuan Qing Lim  ▁█▇▇▄▇▂ 225    ↑19     ▁▁▁▁▁▁▁ 7        ██▁█▁▁▁ 108    ↑3
  13  Set Layer Size             Yuan Qing Lim  ▃▇█▇▂▇▂ 128    ↑25     ▁▁▁█▁▁▁ 10  ↑1   ▁▁█▄▄▂▂ 113    ↑14

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

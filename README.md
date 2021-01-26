# Figma Plugins Stats [![npm Version](https://img.shields.io/npm/v/figma-plugins-stats?cacheSeconds=1800)](https://www.npmjs.com/package/figma-plugins-stats) [![build](https://github.com/yuanqing/figma-plugins-stats/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-stats/actions?query=workflow%3Abuild)

> A CLI to get live and historical stats for your [Figma plugins](https://www.figma.com/community)

*N.B.* Figma Plugin Stats is not official software by Figma. It relies on Figma’s internal APIs, which may break or become unavailable at any time.

## Quick start

*Requires [Node.js](https://nodejs.org/).*

To get the plugin stats for a particular plugin publisher, enter `npx figma-plugins-stats` followed by a [profile handle](https://help.figma.com/hc/en-us/articles/360038510833--Create-a-Community-Profile#Creator_profiles):

```
$ npx figma-plugins-stats yuanqing

  period  7d
  from    2020-11-12 14:13:17 UTC+8
  to      2020-11-19 08:21:43 UTC+8

  no  name                         publisher      installs             likes           views
  1   Clean Document               Yuan Qing Lim  ▅▅▃▄██▄ 31,439 ↑267  █▄▁▁▁▁▁ 426 ↑3  ▆▆▃▅██▇ 359,142 ↑11,570
  2   Insert Big Image             Yuan Qing Lim  ▅▅▃▄█▆▃ 5,624  ↑252  ▁▁▁▁█▁▁ 113 ↑1  █▇▆███▅ 134,382 ↑8,516
  3   Organize Layers              Yuan Qing Lim  ▇▃▄▄▃█▅ 3,040  ↑66   ▁▁▁▁▁▁▁ 68      █▅▄▅▇█▆ 70,165  ↑3,528
  4   Select Layers                Yuan Qing Lim  ▆▃▃▃▅█▇ 2,109  ↑65   ▁▁▁▁▁█▁ 54  ↑1  ▅▄▃▆██▇ 50,572  ↑2,899
  5   Sort Layers                  Yuan Qing Lim  ▅▄▁▂▃█▂ 2,889  ↑45   ▁▁▁▁▁▁▁ 45      ▆▄▂▄▅█▅ 47,351  ↑2,902
  6   Component Utilities          Yuan Qing Lim  ██▁▄▇▄█ 2,340  ↑39   ▁▁▁▁▁▁█ 69  ↑1  █▇▃▅▅██ 93,114  ↑4,122
  7   Flatten Selection to Bitmap  Yuan Qing Lim  ▅▅▃▁▅██ 1,036  ↑28   ▁▁▁▁▁▁▁ 34      █▅▄▇▄▆▆ 57,440  ↑2,378
  8   Text Utilities               Yuan Qing Lim  ▄█▁▁▂▄▄ 64     ↑11   ▁▁▁▁▁▁▁ 6       ██▆██▇▇ 9,708   ↑2,011
  9   Distribute Layers            Yuan Qing Lim  ▄▄▂▂▁█▁ 999    ↑10   ▁▁▁▁▁▁▁ 11      ▆▄▆█▆█▄ 21,091  ↑1,491
  10  Language Tester              Yuan Qing Lim  ▆▃▁▁▆█▆ 1,540  ↑10   ▁▁▁▁▁▁▁ 22      █▇█▇▅▅▅ 31,563  ↑1,541
  11  Format Currency              Yuan Qing Lim  ██▁▄▄▄█ 979    ↑9    ▁▁▁▁▁▁▁ 14      ▇▇▄█▇▄█ 23,505  ↑1,465
  12  Draw Mask Under Selection    Yuan Qing Lim  ▄▄▄▁▁▁█ 422    ↑5    ▁▁▁▁▁▁▁ 8       █▃██▅▄█ 14,657  ↑1,266
  13  Set Layer Size               Yuan Qing Lim  █▄▁▁█▁▁ 393    ↑4    ▁▁▁▁▁▁▁ 17      █▆▅█▄▅▆ 21,665  ↑1,563
  14  Draw Slice Over Selection    Yuan Qing Lim  ▁█▁▁▁█▁ 797    ↑2    ▁▁▁▁▁▁▁ 6       █▄███▇▇ 14,377  ↑1,097
  15  Move Layers                  Yuan Qing Lim  █▁▁▁█▁▁ 971    ↑2    ▁▁▁▁▁▁▁ 7       █▄█▇▆▄▅ 20,308  ↑1,256

                                   totals         ▆▆▃▄██▅ 54,642 ↑815  █▄▁▁▄▄▄ 900 ↑6  █▆▅▇██▇ 969,040 ↑47,605

```

In the above example, for the plugin `Clean Document`, we see that:

- `31,439` is the current install count.
- `267` is the increase in install count over the 7-day period.
- The [sparkline](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR) (`▅▅▃▄██▄`) shows the trend in the increase in install count over the period.

By default, the historical time period is 7 days.

- Set this using the `--time` flag. For example: `--time 7d`, `--time 2w`.
- *N.B.* Historical data goes back to 1 April 2020 at the most.

By default, plugins are sorted in descending order of the increase in install count.

- Set this using the `--sort` flag. For example: `--sort publisher`, `--sort name`, `--sort installs`, `--sort installs-delta`, `--sort likes`, `--sort likes-delta`, `--sort views`, `--sort views-delta`.

Omit the profile handle to get the stats for *all* Figma plugins:

```
$ npx figma-plugins-stats | less -r
```

## CLI

```
$ npx figma-plugins-stats --help

  A CLI to get live and historical stats for your Figma plugins.

  Usage:
    $ figma-plugins-stats <handle> [options]

  Arguments:
    <handle>  A Figma profile handle.

  Options:
    -h, --help     Print this message.
    -l, --limit    Limit the number of plugins returned.
    -s, --sort     Set the sort order. One of 'name', 'publisher', 'installs',
                   'installs-delta', 'likes', 'likes-delta', 'views' or
                   'views-delta'. Defaults to 'installs-delta'.
    -t, --time     Set the period of historical data to show. Defaults to
                   '7d'.
    -v, --version  Print the version.

  Examples:
    $ figma-plugins-stats | less -r
    $ figma-plugins-stats yuanqing
    $ figma-plugins-stats --limit 10
    $ figma-plugins-stats --sort name
    $ figma-plugins-stats --sort publisher
    $ figma-plugins-stats --sort installs
    $ figma-plugins-stats --sort installs-delta
    $ figma-plugins-stats --sort likes
    $ figma-plugins-stats --sort likes-delta
    $ figma-plugins-stats --sort views
    $ figma-plugins-stats --sort views-delta
    $ figma-plugins-stats --time 7d
    $ figma-plugins-stats --time 2w

```

## API

```js
const fetchLivePluginsDataAsync = require('figma-plugins-stats')
```

#### const plugins = await fetchLivePluginsDataAsync()

Fetches the latest meta data and stats of all public Figma plugins.

Returns a Promise for an array of objects that each have the following keys:

- `id`
- `name`
- `description`
- `lastUpdateDate`
- `publisherHandle`
- `publisherId`
- `publisherName`
- `installCount`
- `likeCount`
- `viewCount`

## Installation

```
$ npm install --global figma-plugins-stats
```

## Shields.io badges

Figma Plugins Stats also provides a JSON API for displaying stats as [Shields.io](https://shields.io/) badges on a GitHub `README` page.

### Plugin stats

*Replace `<ID>` with your Figma plugin ID*

[![installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/installs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/installs.json)

```md
![installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/installs.json)
```

[![likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/likes.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/likes.json)

```md
![likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/likes.json)
```

### Publisher stats

*Replace `<PUBLISHER>` with your Figma profile handle*

[![total installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/installs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/installs.json)

```md
![total installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/installs.json)
```

[![total likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/likes.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/likes.json)

```md
![total likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/likes.json)
```

## Implementation details

A snapshot of the stats for all Figma plugins is taken everyday at approximately 6 AM UTC+0, [via a GitHub action](.github/workflows/scrape.yml). (The first snapshot was taken on 1 April 2020.) Each snapshot is stored as a JSON file and [served on GitHub pages](https://github.com/yuanqing/figma-plugins-stats/tree/gh-pages). Historical data surfaced in the CLI is backed by these snapshots.

## License

[MIT](/LICENSE.md)

# Figma Plugins Stats [![npm Version](https://img.shields.io/npm/v/figma-plugins-stats?cacheSeconds=1800)](https://www.npmjs.com/package/figma-plugins-stats) [![build](https://github.com/yuanqing/figma-plugins-stats/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-stats/actions?query=workflow%3Abuild)

> A CLI to get live and historical stats for your [Figma plugins](https://www.figma.com/community)

## Quick start

*Requires [Node.js](https://nodejs.org/).*

To get the plugin stats for a particular plugin author, enter `npx figma-plugins-stats` followed by a [profile handle](https://help.figma.com/hc/en-us/articles/360038510833--Create-a-Community-Profile#Creator_profiles):

```
$ npx figma-plugins-stats yuanqing

  period  7d
  from    2020-04-04 14:05:31 UTC+8
  to      2020-04-11 21:56:59 UTC+8

  no  name                       publisher      installs                likes
  1   Clean Document             Yuan Qing Lim  ▅▆████▇▂ 22,113 ↑1,068  ▃██▃▆▆▆▁ 296 ↑14
  2   Insert Big Image           Yuan Qing Lim  ▅▅█▇▅▄█▄ 1,105  ↑88     ▁█▁▁█▁█▁ 34  ↑3
  3   Organize Layers            Yuan Qing Lim  ▂▄█▄▅█▆▃ 988    ↑47     ▁▁▁▁▁██▁ 34  ↑2
  4   Component Utilities        Yuan Qing Lim  ▄▅█▄█▄▅▂ 1,058  ↑40     ▁▁▁█▁▁█▁ 32  ↑2
  5   Sort Layers                Yuan Qing Lim  █▂▆▁▅▇█▄ 1,543  ↑40     ▁▁▁█▁▁▁▁ 19  ↑1
  6   Select Layers              Yuan Qing Lim  ▄▃▇▇█▁█▄ 638    ↑34     ▁█▁██▁▁▁ 22  ↑3
  7   Language Tester            Yuan Qing Lim  ▅▁▂▄█▁▅▁ 1,039  ↑27     ▁▁█▁▁▁▁▁ 17  ↑1
  8   Set Layer Size             Yuan Qing Lim  █▂█▂▅▄█▄ 140    ↑24     █▁▁▁▁█▁▁ 11  ↑2
  9   Format Currency            Yuan Qing Lim  █▂▃▂▆▂▃▃ 595    ↑19     ▁▁▁▁▁▁▁▁ 11
  10  Draw Mask Under Selection  Yuan Qing Lim  █▄█▂▁▁▆▆ 231    ↑17     ▁▁▁▁▁▁▁▁ 7
  11  Draw Slice Over Selection  Yuan Qing Lim  █▄▂▂▂▁▆▄ 581    ↑14     ▁▁▁▁▁▁▁▁ 3
  12  Distribute Layers          Yuan Qing Lim  █▂▂▁▁▂▅▄ 706    ↑12     ▁▁▁▁▁▁▁▁ 6
  13  Move Layers                Yuan Qing Lim  ██▂▁▁▁▄▄ 688    ↑11     ▁▁▁▁▁▁▁▁ 6

                                 totals         ▆▆█████▃ 31,425 ↑1,441  ▄█▇▇▇▇█▁ 498 ↑28

```

In the above example, for the plugin `Clean Document`, we see that:

- `22,113` is the current install count.
- `1,068` is the increase in install count over the 7-day period.
- The [sparkline](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR) (`▅▆████▇▂`) shows the trend in the increase in install count over the period.

By default, the historical time period is 7 days.

- Set this using the `--time` flag. For example: `--time 7d`, `--time 2w`.
- *N.B.* Historical data goes back to 1 April 2020 at the most.

By default, plugins are sorted in descending order of the increase in install count.

- Set this using the `--sort` flag. For example: `--sort publisher`, `--sort name`, `--sort installs`, `--sort installs-delta`, `--sort likes`, `--sort likes-delta`.

Omit the profile handle to get the stats for *all* Figma plugins:

```
$ npx figma-plugins-stats | less -r
```

## CLI

```
$ npx figma-plugins-stats --help

  Description
    A CLI to get live and historical stats for your Figma plugins

  Usage
    $ figma-plugins-stats [handle] [options]

  Options
    -l, --limit      Limit the number of plugins returned
    -s, --sort       Set the sort order  (default installs-delta)
    -t, --time       Set the period of historical data to show  (default 7d)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ figma-plugins-stats | less -r
    $ figma-plugins-stats yuanqing
    $ figma-plugins-stats --limit 10
    $ figma-plugins-stats --sort name
    $ figma-plugins-stats --sort publisher
    $ figma-plugins-stats --sort installs
    $ figma-plugins-stats --sort installs-delta
    $ figma-plugins-stats --sort likes
    $ figma-plugins-stats --sort likes-delta
    $ figma-plugins-stats --time 7d
    $ figma-plugins-stats --time 2w

```

## API

```js
const fetchFigmaPluginsStats = require('figma-plugins-stats')
```

#### const plugins = await fetchFigmaPluginsStats()

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

## Installation

```
$ npm install --global figma-plugins-stats
```

## Implementation details

A snapshot of the stats for all Figma plugins is taken everyday at approximately 6 AM UTC+0, [via a GitHub action](.github/workflows/scrape.yml). (The first snapshot was taken on 1 April 2020.) Each snapshot is stored as a JSON file and [served on GitHub pages](https://github.com/yuanqing/figma-plugins-stats/tree/gh-pages). Historical data surfaced in the CLI is backed by these snapshots.

## License

[MIT](LICENSE.md)

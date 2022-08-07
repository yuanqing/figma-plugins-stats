> # ❌ *Deprecated* ❌

---

# Figma Plugins Stats [![npm Version](https://img.shields.io/npm/v/figma-plugins-stats?cacheSeconds=1800)](https://www.npmjs.com/package/figma-plugins-stats) [![build](https://github.com/yuanqing/figma-plugins-stats/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-stats/actions?query=workflow%3Abuild)

> A CLI to get live and historical stats for your [Figma plugins](https://figma.com/community/explore?tab=plugins)

*N.B.* Figma Plugin Stats is not official software by Figma. It relies on Figma’s internal APIs, which may break or become unavailable at any time.

## Quick start

*Requires [Node.js](https://nodejs.org/).*

To get the plugin stats for a particular plugin publisher, enter `npx --yes -- figma-plugins-stats` followed by a [profile handle](https://help.figma.com/hc/en-us/articles/360038510833--Create-a-Community-Profile#Creator_profiles):

```
$ npx --yes -- figma-plugins-stats yuanqing

  period  7d
  from    2022-06-25 14:04:59 UTC+8
  to      2022-07-03 00:14:46 UTC+8

  no  name                         publisher      runs                    installs              likes            views
  1   Clean Document               Yuan Qing Lim  ▁▁▁▁█ 39,082  ↑39,082   ▆▇█▅▁ 75,926  ↑397    ▄▂█▆▁ 949   ↑10  ▄▅█▇▁ 49,777  ↑467
  2   Insert Big Image             Yuan Qing Lim  ▁▁▁▁█ 36,468  ↑36,468   ▇██▃▁ 44,379  ↑456    ▆▆█▁▁ 471   ↑7   ▄▅█▇▁ 40,870  ↑667
  3   Draw Connector               Yuan Qing Lim  ▁▁▁▁█ 19,737  ↑19,737   ▄▆█▄▁ 21,266  ↑302    █▄▁█▁ 353   ↑5   ▄▅█▆▁ 33,135  ↑606
  4   Select Layers                Yuan Qing Lim  ▁▁▁▁█ 12,066  ↑12,066   ▅▇█▄▁ 16,563  ↑188    ▆▁█▁▁ 281   ↑5   ▃▄█▄▁ 17,691  ↑335
  5   Sort Layers                  Yuan Qing Lim  ▁▁▁▁█ 8,536   ↑8,536    ▅▅█▂▁ 11,375  ↑81     ▁▁▁▁▁ 169        ▃▃█▇▁ 11,694  ↑172
  6   Organize Layers              Yuan Qing Lim  ▁▁▁▁█ 8,458   ↑8,458    ███▆▁ 12,958  ↑73     ▁██▁▁ 217   ↑2   ▃▅█▆▁ 15,518  ↑127
  7   Flatten Selection to Bitmap  Yuan Qing Lim  ▁▁▁▁█ 8,236   ↑8,236    ▇█▇▂▁ 10,484  ↑68     ▁█▁▁▁ 142   ↑1   ▅▅█▇▁ 13,725  ↑180
  8   Component Utilities          Yuan Qing Lim  ▁▁▁▁█ 5,661   ↑5,661    ▄█▃▂▁ 7,458   ↑23     █▁▁▁▁ 213   ↑1   ▄▅█▄▁ 17,855  ↑148
  9   Upscale Image                Yuan Qing Lim  ▁▁▁▁█ 2,898   ↑2,898    █▅▆▃▁ 3,428   ↑46     ▁▁▁▁▁ 63         █▅▇▆▁ 4,745   ↑81
  10  Language Tester              Yuan Qing Lim  ▁▁▁▁█ 2,764   ↑2,764    █▄▄▃▁ 4,202   ↑27     ▁▁▁▁▁ 72         ▃▆█▅▁ 5,402   ↑71
  11  Text Utilities               Yuan Qing Lim  ▁▁▁▁█ 1,476   ↑1,476    ██▄▁▁ 1,969   ↑10     █▁▁▁▁ 78    ↑1   ▆▄█▄▁ 6,038   ↑53
  12  Set Layer Size               Yuan Qing Lim  ▁▁▁▁█ 1,290   ↑1,290    ██▄▄▁ 2,121   ↑12     ▁▁▁▁▁ 46         ▅██▄▁ 3,641   ↑36
  13  Format Currency              Yuan Qing Lim  ▁▁▁▁█ 1,227   ↑1,227    ▅█▁▄▁ 2,208   ↑10     ▁▁▁▁▁ 32         ▄▅█▅▂ 4,214   ↑58
  14  Distribute Layers            Yuan Qing Lim  ▁▁▁▁█ 767     ↑767      ▄▅█▁▁ 1,975   ↑10     █▁▁▁▁ 32    ↑1   ▆██▇▂ 2,506   ↑22
  15  Move Layers                  Yuan Qing Lim  ▁▁▁▁█ 676     ↑676      █▆▃▁▁ 1,959   ↑6      ▁▁▁▁▁ 33         ▄█▆▄▃ 2,676   ↑18
  16  Draw Mask Under Selection    Yuan Qing Lim  ▁▁▁▁█ 608     ↑608      █▄▄▁▁ 1,129   ↑4      ▁▁▁▁▁ 24         ▄▄█▄▁ 1,801   ↑11
  17  Draw Slice Over Selection    Yuan Qing Lim  ▁▁▁▁█ 418     ↑418      ▁█▄▁▁ 1,246   ↑2      ▁▁▁▁▁ 20         ▁▁█▂▁ 1,388   ↑15

                                   totals         ▁▁▁▁█ 150,368 ↑150,368  ▆██▄▁ 220,646 ↑1,715  █▅█▄▁ 3,195 ↑33  ▄▅█▆▁ 232,676 ↑3,067

```

In the above example, for the plugin `Clean Document`, we see that:

- `75,926` is the current install count.
- `397` is the increase in install count over the 7-day period.
- The [sparkline](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR) (`▆▇█▅▁`) shows the trend in the increase in install count over the period.

By default, the historical time period is 7 days.

- Set this using the `--time` flag. For example: `--time 7d`, `--time 2w`.
- *N.B.* Historical data goes back to 1 April 2020 at the most.

By default, plugins are sorted in descending order of the increase in run count.

- Set this using the `--sort` flag. For example: `--sort publisher`, `--sort name`, `--sort installs`, `--sort installs-delta`, `--sort likes`, `--sort likes-delta`, `--sort runs`, `--sort runs-delta`, `--sort views`, `--sort views-delta`.

Omit the profile handle to get the stats for *all* Figma plugins:

```
$ npx --yes -- figma-plugins-stats | less -r
```

## CLI

```
$ npx --yes -- figma-plugins-stats --help

  A CLI to get live and historical stats for your Figma plugins.

  Usage:
    $ figma-plugins-stats <handle> [options]

  Arguments:
    <handle>  A Figma profile handle.

  Options:
    -h, --help     Print this message.
    -l, --limit    Limit the number of plugins returned.
    -s, --sort     Set the sort order. One of 'name', 'publisher', 'installs',
                   'installs-delta', 'likes', 'likes-delta', 'runs',
                   'runs-delta', 'views' or 'views-delta'. Defaults to
                   'runs-delta'.
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
    $ figma-plugins-stats --sort runs
    $ figma-plugins-stats --sort runs-delta
    $ figma-plugins-stats --sort views
    $ figma-plugins-stats --sort views-delta
    $ figma-plugins-stats --time 7d
    $ figma-plugins-stats --time 2w

```

## API

```js
import { fetchLivePluginsDataAsync } from 'figma-plugins-stats'
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
- `runCount`
- `viewCount`

## Installation

```
$ npm install --global figma-plugins-stats
```

## Shields.io badges

Figma Plugins Stats also provides a JSON API for displaying stats as [Shields.io](https://shields.io/) badges on a GitHub `README` page.

### Plugin stats

*Replace `<ID>` with your Figma plugin ID*

[![runs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/runs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/runs.json)

```md
![runs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/runs.json)
```

[![installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/installs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/installs.json)

```md
![installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/installs.json)
```

[![likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/likes.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/likes.json)

```md
![likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/likes.json)
```

[![views](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/views.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/767379019764649932/views.json)

```md
![views](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/<ID>/views.json)
```

### Publisher stats

*Replace `<PUBLISHER>` with your Figma profile handle*

[![total runs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/runs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/runs.json)

```md
![total runs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/runs.json)
```

[![total installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/installs.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/installs.json)

```md
![total installs](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/installs.json)
```

[![total likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/likes.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/likes.json)

```md
![total likes](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/likes.json)
```

[![total views](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/views.json)](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/yuanqing/views.json)

```md
![total views](https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/publisher/<PUBLISHER>/views.json)
```

## Implementation details

A snapshot of the stats for all Figma plugins is taken everyday at approximately 6 AM UTC+0, [via a GitHub action](.github/workflows/scrape.yml). (The first snapshot was taken on 1 April 2020.) Each snapshot is stored as a JSON file and [served on GitHub pages](https://github.com/yuanqing/figma-plugins-stats/tree/gh-pages). Historical data surfaced in the CLI is backed by these snapshots.

## License

[MIT](/LICENSE.md)

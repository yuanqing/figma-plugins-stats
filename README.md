# figma-plugins-data [![npm Version](https://img.shields.io/npm/v/figma-plugins-data)](https://www.npmjs.com/package/figma-plugins-data) [![build](https://github.com/yuanqing/figma-plugins-data/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins-data/actions?query=workflow%3Abuild)

> Get the latest [Figma Plugins](https://www.figma.com/community) meta data and statistics

## API

```js
const figmaPluginsData = require('figma-plugins-data')
```

#### const data = await figmaPluginsData()

Fetches the live meta data and statistics of each Figma Plugin. Each object literal in the `data` array has the following keys:

- `id`
- `name`
- `description`
- `lastUpdateDate`
- `tags`
- `authorId`
- `authorHandle`
- `installCount`
- `likeCount`
- `viewCount`

## Installation

```sh
$ yarn add figma-plugins-data
```

## License

[MIT](LICENSE.md)

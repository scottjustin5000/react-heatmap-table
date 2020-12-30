# react-heatmap-table

> react heatmap table

[![NPM](https://img.shields.io/npm/v/react-heatmap-table.svg)](https://www.npmjs.com/package/react-heatmap-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-heatmap-table
```

## Usage

```jsx
import React from 'react'

import HeatMap from 'react-heatmap-table'
import 'react-heatmap-table/dist/index.css'

const Example = () => {
   const data = [
        [0.846, 0.535, 0.476, 0.567, 0.819, 0.934, 0.765, 0.832, 0.123],
        [0.673, 0.432, 0.518, 0.734, 0.812, 0.378, 0.578, 0.796, 0.933],
        [0.227, 0.812, 0.856, 0.671, 0.145, 0.678, 0.978, 0.690, 0.133],
        [0.875, 0.8, 0.833, 1, 1, 1, 0.478, 1, 0.933],
        [0.933, 0.923, 0.916, 0.875, 0.947, 0.900, 0.463, 0.231, 0.978],
        [1, null, 0.8, 0.875, 0.727, 0.878, 0.778, 1, 0.890],
        [0, 0.435, 0.876, null, 0.819, 0.234, 0.87, 0.999, 0.333],
        [0.994, 0.698, 0.918, 0.834, 0.712, 0.878, 0.978, null, 0.733],
        [0.727, 0.812, 0.856, 1, 1, 0.678, 0.578, 0, 0.333]
      ]
      const yLabels1 = [8,7,6,5,4,3,2,1,0]
      const xLabels1 = ['a','b','c','d','e', 'f', 'g', 'h', 'i']

  return (<div style={{width: '250px', height: '250px'}}> 
  <HeatMap
     data={data}
     yLabels={yLabels}
     xLabels={xLabels}
   />
  </div>
  )

}
```

## Options
 * `data`           a two dimensional array of data to generate the heat map
 * `yLabels`        array of labels for y axis
 * `xLabels`        array of labels for x axis
 * `showLabels`     *optional* boolean indicating if the cells should display values (if the calculated cell size is too small, labels will be supressed),
 * `axisLabelColor` *optional* hex string to specify background color for table axes defaults to `#ffffff`
 * `nullColor`      *optional* hex string to specify color of cells with null values
 * `height`         *optional* int height (default to height of parent container)
 * `weight`         *optional* int width (default to width of parent container)
 * `useAvg`         *optional* boolean to indicate whether to use dynamic dimensions for cells defaults to false 
                    false = each table cell's h and w are calculated as follows h = componentHeight / yLabels.length, w = componentWidth / xLables.length.
                    true = each table cells's h and w are set using the above calculation and dividing by 2 (essentially forming squares rather than rectangles).
                    it should be noted that setting to true will cause the component's size to be modifed (i.e. not honoring set height and width)
 * `resize`         *optional* boolean to indicate if the component should be resized. resize = true will be ignored if a height and width been set.
 * `formatter`      *optional* function to format table values (this will not format tips)

## License

MIT © [scottjustin5000](https://github.com/scottjustin5000)

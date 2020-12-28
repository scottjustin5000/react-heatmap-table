import HeatGradient from './heat'

class Gradient {
  constructor(heading, rows) {
    this.heading = heading
    this.rows = rows
  }

  getData = (options) => {
  
    const adjust = (v) => {
        if (options && options.logn) {
            return Math.log(v)
        }
        return v
    }

    const headings = this.heading
    let high = 0
    let low = Number.MAX_SAFE_INTEGER
    const rows = this.rows.map((r) => {
      const label = r[0], values = r[1], extra = r[2]
      high = Math.max.apply(Math, values.concat([high]))
      low = Math.min.apply(Math, values.concat([low]))
      if (low < 0) throw Error('negatives not supported....')
      return { label, cells: { values: values, colors: [], scales: [], extra } }
    })
    const heatMapGradient = new HeatGradient()
  
    rows.forEach((row) => {
      row.cells.values.forEach((value, i) => {
        const scale  = adjust(value - low) / adjust(high - low)
        const color = heatMapGradient.getColorAtValue(scale)
        row.cells.colors[i] = color
        row.cells.scales[i] = scale
      })
    })
    return { headings, high, low, rows }
  }
}

export default Gradient
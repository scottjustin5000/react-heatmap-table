import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import HeatMap  from './gradient'
import Tooltip from './tooltip'
import debounce from './debounce'

import {
  Table,
  Td,
  NulledTd,
  Axis,
  XAxis,
  AxisLabel,
  CellLabel,
  XAxisLabel
} from './styles'


const HeatMapTable = (props) => {
  const resize = props.resize && !props.height && !props.width && !props.cellSize
  const MIN = 14
  const ref = useRef()
  const savedCallback = useRef()
  const [yWidth, setYWidth] = useState(120)
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [data, setData] = useState()
  const [showLabels, setShowLabels] = useState(props.showLabels)
  const [componentHeight, setComponentHeight] = useState()
  const [componentWidth, setComponentWidth] = useState()

  const axisLabelColor = props.axisLabelColor || '#fff' 
  const nullColor = props.nullColor || '#000'

  const determineWidth = (yLabels) => {
    let maxLen = 0
    yLabels.forEach((l)=> {
      maxLen = Math.max(maxLen, l.toString().length)
    })
    const yw = Math.min(yWidth, maxLen * 8)
    return yw
  }

  const setDimensionData = ({yLabels, xLabels, width, height, useAvg, showLabels }) => {

    if(width === componentWidth && height === componentHeight) return
      const yw = determineWidth(yLabels)
      setYWidth(yw)
      const adjusted = (width - yw)
      const h = height / (yLabels.length + 1)
      const w = adjusted / (xLabels.length)
      setComponentWidth(width)
      setComponentHeight(height)
      const avg = (h + w) / 2
      if(h < MIN || w < MIN) {
        setShowLabels(false)
      } else if(showLabels) {
        setShowLabels(true)
      } 
      if(useAvg) {
        setHeight(avg)
        setWidth(avg)
      } else {
        setHeight(h)
        setWidth(w)
      }
  }

  useEffect(() => {
    if(!props.yLabels || !props.yLabels.length) return

    const input = props.yLabels.map((label, i) => [label,(props.data[i] || [])] )
    const heatMap = new HeatMap(props.xLabels, input)
    
    const data = heatMap.getData()
    if(!props.cellSize) {
      const componentWidth = props.width || ref.current.parentNode.clientWidth 
      const componentHeight = props.height || ref.current.parentNode.clientHeight
      setDimensionData({ xLabels: props.xLabels, yLabels: props.yLabels, height: componentHeight, width: componentWidth, useAvg: props.useAvg, showLabels: props.showLabels })
    } else {
      if(props.cellSize < MIN) setShowLabels(false)
      const yw = determineWidth(props.yLabels)
      setYWidth(yw)
      setComponentHeight(props.cellSize * (props.yLabels.length + 1))
      setHeight(props.cellSize)
      setWidth(props.cellSize)
    }
    setData(data)

  }, [props.data, props.yLabels, props.xLabels])

  useEffect(() => {
    function func(args) {
      savedCallback.current(args)
    }
    const debouncedResizeHandler = debounce(() => {
      if(!resize) return
      const width = ref.current.parentNode.clientWidth 
      const height = ref.current.parentNode.clientHeight
      func({ xLabels: props.xLabels, yLabels: props.yLabels, height, width, useAvg: props.useAvg, showLabels: props.showLabels })
    }, 200)
    window.addEventListener('resize', debouncedResizeHandler)
    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, [props])

  useEffect(() => {
    savedCallback.current = setDimensionData
  })

  const background = (rgb) => {
    return `rgb(${rgb.red * 100}%, ${rgb.green * 100}%, ${rgb.blue * 100}%)`
  }

  const cols = cells => {
      return cells.colors.map((c, i) => {
        if(cells.values[i] === null) {
          return (
            <NulledTd
              key={`td_${i}`} 
              height={height} 
              width={width} 
              background={nullColor}
              color={nullColor}>
            </NulledTd>
          )
        }
      return (
        <Tooltip key={`tt_${i}`} title={cells.scales[i]}>
          <Td 
            key={`td_${i}`} 
            height={height} 
            width={width} 
            borderColor={nullColor}
            background={background(c)}
          >
        { showLabels && <CellLabel width={width}>{props.formatter(cells.scales[i])}</CellLabel> }
          </Td> 
        </Tooltip>)
      })
  }
    
  const Rows = () =>
    data.rows.map((row, i) => <div key={row.label}>
        <div style={{display: 'flex'}}> 
          <Tooltip key={`yatt_${i}`} title={row.label}>
              <Axis 
                height={height} 
                width={yWidth}
                axisLabelColor={axisLabelColor}
                color={nullColor}> 
                <AxisLabel width={yWidth}>{ row.label }</AxisLabel> 
              </Axis>
          </Tooltip> {cols(row.cells)}
        </div>
    </div>
  )

  const Footer = ()=> {
    const tiles = () => props.xLabels.map(h => 
      <Tooltip key={`xatt_${h}`} title={h}>
        <XAxis key={`footer_${h}`} height={height} width={width} axisLabelColor={axisLabelColor} color={nullColor}> 
          <XAxisLabel width={width}>{ h }</XAxisLabel> 
        </XAxis> 
      </Tooltip>
      )
    
    return (<div style={{display: 'flex'}}> 
      <XAxis height={height} width={yWidth} axisLabelColor={axisLabelColor} color={nullColor}></XAxis> {tiles()} 
      </div>)
  }

    return (
      <div ref={ref} style={{overflow:'scroll'}}> 
        <Table width={componentWidth} height={componentHeight}>
          <div style={{ backgroundColor:nullColor}}>
          { !!(data && componentHeight) && <Rows />  }
          </div>
          { !!(props.xLabels && componentHeight) && <Footer /> }
        </Table>
      </div>
    )
}

HeatMapTable.propTypes = {
  cellSize: PropTypes.number,
  showLabels: PropTypes.bool,
  axisLabelColor: PropTypes.string,
  nullColor: PropTypes.string,
  data: PropTypes.array,
  yLabels: PropTypes.array,
  xLabels: PropTypes.array,
  useAvg: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  resize: PropTypes.bool,
  formatter: PropTypes.func
}

HeatMapTable.defaultProps = {
  formatter: (value) => { 
    const isDecimal = (num) => {
      return !!(num % 1)
    }
    if(!isDecimal(value)) return value
    return value.toFixed(1)
  }
}
  
export default HeatMapTable

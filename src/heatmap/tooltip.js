import React, { useRef, useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'

const TooltipText = styled.div`
  display: flex;
  position: fixed;
  top: ${props => props.top || 0}px;
  left: 0px;
  transform: translate3d(${props => `${props.x || 0}px, ${props.y || 0}px, ${props.z || 0}px`});
  color: white;
  background-color: #455667;
  max-width: 300px;
  padding: 8px;
  white-space: pre-line;
  font-size: ${props => props.fontSize || 10}px;
  font-weight: 400;
  text-transform: none;
  z-index: 1200;
`
const Flex = styled.div`
  display: flex;
`

const Tooltip = (props) => {

  const [visible, setVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const ref = useRef()
  const tooltipRef = useRef()

  useEffect(()=> {
    const calculateCoordinates = () => {
      const offsetX = props.offsetX || 0
      const offsetY =  props.offsetY || 0
      const w = tooltipRef.current ? tooltipRef.current.clientWidth : 1
      const h = tooltipRef.current ? tooltipRef.current.clientHeight : 1
      const refClientRect = ref.current.getBoundingClientRect()
      const x = refClientRect ? (refClientRect.x || refClientRect.left) + (refClientRect.width / 2) - (offsetX + w / 2) : 0
      const y = refClientRect ? (refClientRect.y || refClientRect.bottom) - (offsetY + h) : 0
      
      setX(x)
      setY(y)

    }
    if(!visible) return
    calculateCoordinates()
    
  },[visible])

  const onMouseOver = (e) => {
    e.stopPropagation()
    if (visible) return
    setVisible(true)
  }

  const onMouseLeave = (e) => {
    setVisible(false)
  }

  if (props.title === '' || props.title === null || props.title === undefined) return props.children
  
  return (
      <Fragment>
        {!!(visible && (x && y)) && (
        <TooltipText
          display={props.display}
          ref={tooltipRef}
          x={x}
          y={y}
          fontSize={props.fontSize}
          top={props.top}>
            {props.title}
        </TooltipText>)
        }
        <Flex
          ref={ref}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          >
          {props.children}
        </Flex>
      </Fragment>
    )
}

export default Tooltip

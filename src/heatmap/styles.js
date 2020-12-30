import styled from 'styled-components'

const Table = styled.div`
  height: ${props=> props.height}px; 
  max-width: ${props=> props.width}px; 
`

const Td = styled.div.attrs(props => ({
  style: {
    background: props.background,
  },
}))`
  display: flex;
  justify-content: center;
  text-align: center; 
  align-items: center;
  box-sizing: border-box;
  height: ${props => props.height}px;
  min-width:${props => props.width}px;
  border: solid 1px ${props => props.borderColor};
  cursor: pointer;
  font-size: 0.3em;
`
const NulledTd = styled.div`
  display: flex;
  justify-content: center;
  text-align: center; 
  align-items: center;
  box-sizing: border-box;
  background: ${props => props.background};
  height: ${props => props.height}px;
  min-width: ${props => props.width}px;
  border-width: thin;
`

const Axis = styled.div`
  min-width: ${props => props.width}px;
  max-height: ${props => props.height}px;
  box-sizing: border-box;
  display: flex;
  background-color: ${props => props.axisLabelColor};
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis; 
  cursor: pointer;
`

const XAxis = styled.div`
  min-width: ${props => props.width}px;
  min-height: ${props => props.height}px;
  box-sizing: border-box;
  display: flex;
  background-color: ${props => props.axisLabelColor};
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis; 
  text-align: center; 
  cursor: pointer;
`
const AxisLabel = styled.div`
  flex:1;
  box-sizing: border-box;
  padding-left: 2px;
  white-space: nowrap; 
  overflow: hidden;  
  font-size: 0.4em;
  width: ${props=> props.width}px; 
  text-overflow: ellipsis;
`

export {
  Table,
  Td,
  NulledTd,
  Axis,
  XAxis,
  AxisLabel
}
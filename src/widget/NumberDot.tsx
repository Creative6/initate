import * as React from "react"
import styled from "styled-components"

const Dot = styled.span`
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  display: inline-block;
  color: #fff;
  margin-right: 5px;
  font-size: 12px;
`

const colorList: any = ["#ff3939", "#19b3cc", "#da9d13"]

const T: React.FC<any> = ({ num }) => {
  return (
    <Dot style={{ background: colorList[num - 1] || "#9cb9b8" }}>{num}</Dot>
  )
}

export default T

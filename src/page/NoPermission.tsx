import * as React from "react"
import styled from "styled-components"

const S: any = {
  NotFound: styled.div`
    font-size: 30px;
    text-align: center;
    width: 100%;
  `,
}

const T: React.FC = () => {
  return (
    <S.NotFound>
      <i className={"iconfont icon-zanwu"} style={{ fontSize: 40 }}></i>
      <div>- Permission denied -</div>
    </S.NotFound>
  )
}

export default T

import React, { useState } from "react"
import styled from "styled-components"

const S = {
  Search: styled.div`
    position: relative;
    width: 280px;
    height: 30px;
  `,
  Input: styled.input`
    background: #eee;
    border: none;
    outline: none;
    height: 100%;
    color: #444;
    width: 100%;
    padding-left: 15px;
    padding-right: 35px;
  `,
  Icon: styled.i`
    position: absolute;
    color: #555;
    right: 10px;
    top: 6px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
      color: #222;
    }
  `,
}

const T: React.FC = (props) => {
  const [keyword, setKeyword] = useState<any>("")

  return (
    <S.Search>
      <S.Icon
        className="iconfont icon-search1"
        onClick={() => {
          window.location.href = `/#/searchresult/${keyword}`
        }}
      />
      <S.Input
        placeholder={"Title or Tag"}
        onChange={(e: any) => {
          setKeyword(e.target.value)
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            window.location.href = `/#/searchresult/${keyword}`
          }
        }}
      />
    </S.Search>
  )
}

export default T

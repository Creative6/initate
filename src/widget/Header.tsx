import React from "react"
import styled from "styled-components"
import Search from "./Search"
import icon from "../assets/icon.gif"

const S = {
  Header: styled.div`
    height: 50px;
    display: flex;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 100%;
    background: #fff;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 0.22);
  `,
  Content: styled.div`
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Title: styled.div`
    color: #000;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  SubTitle: styled.span`
    font-size: 12px;
    margin-left: 5px;
  `,
}

const T: React.FC = () => {
  return (
    <S.Header>
      <S.Content>
        <S.Title
          onClick={() => {
            window.location.href = "/"
          }}
        >
          <img src={icon} alt="" style={{ borderRadius: 10 }} />
          <span style={{ marginLeft: 10 }}>INITATE</span>
          <S.SubTitle>Who threatens my concentration?</S.SubTitle>
          <i className={"iconfont icon-leaf"} style={{ marginLeft: 5 }}></i>
        </S.Title>
        <Search />
      </S.Content>
    </S.Header>
  )
}

export default T

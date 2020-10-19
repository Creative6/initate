import React from "react"
import styled from "styled-components"
import { config } from "../api"

const S = {
  LoginBtn: styled.div`
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0px 15px;
  `,
  LoginIcon: styled.i<any>`
    font-size: 25px;
    transition: all 0.2s;
    margin-right: 10px;
    color: ${(props) => (props.wx ? "#ccc" : "unset")};
    :hover {
      transform: rotate(360deg);
      color: ${(props) =>
        props.qq ? "#00b8ff" : props.wx ? "#44b549" : "#c000ff"};
    }
  `,
}

export default () => {
  return (
    <S.LoginBtn>
      <i
        className="iconfont icon-accountfilling"
        style={{ fontSize: 12, marginRight: 10 }}
      ></i>
      <span style={{ marginRight: 10 }}>Login with </span>
      <S.LoginIcon
        className={"iconfont icon-github"}
        title="Github"
        onClick={() => {
          localStorage.setItem("last_url", window.location.href)
          window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`
        }}
      />
      <S.LoginIcon
        className={"iconfont icon-qq-copy-copy"}
        qq
        title="QQ"
        onClick={() => {
          localStorage.setItem("last_url", window.location.href)
          const redirect_url = encodeURI("http://api.taswell.cn/qqlogin")
          const href_url =
            "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101503025&redirect_uri=" +
            redirect_url +
            "&state=0"
          window.location.replace(href_url)
        }}
      />
      <S.LoginIcon
        className={"iconfont icon-weixin3f"}
        wx
        title="Wechat"
        onClick={() => {
          alert("Not yet open")
        }}
      />
    </S.LoginBtn>
  )
}

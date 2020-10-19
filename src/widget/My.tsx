import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { GET_NOTICE_NUM, DOMAIN_STATIC } from "../api"
import { useHistory } from "react-router"
import jwt from "jwt-decode"
import Cookies from "js-cookie"
import { AppContext } from "../App"
import Login from "./Login"

const S = {
  Content: styled.div`
    display: flex;
  `,
  Img: styled.img`
    width: 56px;
    height: 56px;
    cursor: pointer;
  `,
  Box: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #555;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
    :hover {
      background: #e2e3ec;
    }
  `,
  // Tips: styled.div`
  //   position: absolute;
  //   width: 5px;
  //   height: 5px;
  //   right: 5px;
  //   top: 6px;
  //   z-index: 1;
  //   background: coral;
  //   transform: rotate(45deg);
  //   animation: ${A.rotate} 1s linear infinite;
  // `,
  BoxText: styled.div`
    margin-top: 6px;
  `,
  Hf: styled.i<any>`
    animation: ${(props) =>
      props.noticeNum > 0 ? `zd 1s linear infinite` : `unset`};
  `,
}

const T: React.FC = () => {
  const history = useHistory()

  const [noticeNum, setNoticeNum] = useState<any>(0)
  const [userInfo, setUserInfo] = useState<any>({})

  const { setShowPublish } = useContext<any>(AppContext)

  useEffect(() => {
    try {
      // @ts-ignore
      const data = jwt(Cookies.get("twa"))
      // console.log(data)
      setUserInfo(data)
      GET_NOTICE_NUM().then((rs) => {
        // console.log('GET_NOTICE_NUM', rs)
        setNoticeNum(rs)
      })
    } catch (e) {}
  }, [])

  return (
    <>
      <S.Content>
        {userInfo.name ? (
          <>
            <S.Img
              src={userInfo.icon}
              onClick={() => {
                window.open(`#/users/${userInfo.name}`)
              }}
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = `${DOMAIN_STATIC}/icon/badimg.png`
              }}
            />
            <S.Box
              onClick={() => {
                setShowPublish(true)
              }}
            >
              <i className={"iconfont icon-publish"} />
              <S.BoxText>Publish</S.BoxText>
            </S.Box>
            <S.Box
              onClick={() => {
                history.push("/message")
              }}
            >
              <S.Hf className={"iconfont icon-huifu"} noticeNum={noticeNum} />
              <S.BoxText>Message{noticeNum > 0 && `-${noticeNum}`}</S.BoxText>
              {/* {noticeNum ? <S.Tips /> : null} */}
            </S.Box>
            {/* <S.Box>
                <i className={'iconfont icon-go__icon_like-'}/>
                <S.BoxText>Like</S.BoxText>
            </S.Box> */}
            <S.Box
              onClick={() => {
                Cookies.remove("twa")
                window.location.reload()
              }}
            >
              <i className={"iconfont icon-exit1"} />
              <S.BoxText>Exit</S.BoxText>
            </S.Box>
          </>
        ) : (
          <Login />
        )}
      </S.Content>
    </>
  )
}

export default T

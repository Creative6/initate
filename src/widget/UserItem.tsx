import React, { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../App"

const S = {
  Box: styled.div`
    display: flex;
    width: 400px;
    margin: 10px auto;
    position: relative;
  `,
  Img: styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
  `,
  Content: styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0px 15px;
  `,
  B1: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  B2: styled.div`
    align-items: center;
    display: flex;
  `,
  Btn: styled.div`
    height: 30px;
    line-height: 30px;
    background: #eee;
    font-size: 13px;
    padding: 0px 10px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
      background: #ccc;
      color: #fff;
    }
  `,
  EachIcon: styled.i`
    margin-right: 3px;
  `,
  Name: styled.div`
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  `,
}

const T: React.FC<any> = (props: any) => {
  const {
    // id,
    // uid,
    // target_uid,
    // create_time,
    name,
    avatar_url,
    following,
    followers,
    isMe,
    isLogin,
    isMyFollowing,
    isMyFollowers,
    setFollow,
    originUid,
  } = props
  const { setShowLogin } = useContext<any>(AppContext)

  let BtnText = "FOLLOW"
  let followEachOther = false
  if (isMyFollowing) {
    BtnText = "UNFOLLOW"
  }
  if (isMyFollowing && isMyFollowers) {
    BtnText = "UNFOLLOW"
    followEachOther = true
  }

  return (
    <S.Box>
      <S.Img
        src={avatar_url}
        onClick={() => {
          window.open(`#/users/${name}`)
        }}
      />
      <S.Content>
        <S.B1>
          <S.Name
            onClick={() => {
              window.open(`#/users/${name}`)
            }}
          >
            {name}
          </S.Name>
          <div style={{ fontSize: 12, color: "#aaa" }}>
            Following - {following},Followers - {followers}
          </div>
        </S.B1>
        <S.B2>
          {!isMe && isLogin && (
            <S.Btn
              onClick={() => {
                setFollow(originUid, BtnText)
              }}
            >
              {followEachOther && (
                <S.EachIcon
                  className={"iconfont icon-iconfonthuxiangguanzhu"}
                />
              )}
              {BtnText}
            </S.Btn>
          )}
          {!isLogin && (
            <S.Btn
              onClick={() => {
                // window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`
                setShowLogin(true)
              }}
            >
              FOLLOW
            </S.Btn>
          )}
        </S.B2>
      </S.Content>
    </S.Box>
  )
}

export default T

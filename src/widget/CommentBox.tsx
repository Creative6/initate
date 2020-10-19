import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { SET_COMMENT_SAVE, GET_COMMENTS, DOMAIN_STATIC } from "../api"
import Dot from "./Dot"
import jwt from "jwt-decode"
import Cookies from "js-cookie"
// @ts-ignore
import E from "wangeditor"
import { AppContext } from "../App"

const S: any = {
  SB1: styled.div`
    display: flex;
    flex-direction: column;
  `,
  TextArea: styled.textarea`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
    font-family: unset;
    height: 100px;
    resize: none;
    border: 5px solid #ddd;
    border-bottom: none;
  `,
  FucBox: styled.div`
    display: flex;
    height: 30px;
    background: #ddd;
    align-items: center;
    font-size: 13px;
  `,
  FucBoxLeft: styled.div`
    flex: 1;
  `,
  FucBoxRight: styled.div`
    width: 80px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    background: #ccc;
    cursor: pointer;
    transition: 0.2s;
    :hover {
      background: #bbb;
    }
  `,
  Icon: styled.i`
    color: #888;
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    :hover {
      color: skyblue;
    }
  `,
  ListBody: styled.div`
    backdrop-filter: blur(5px);
    padding: 10px;
    padding-bottom: 1px;
  `,
  List: styled.div`
    display: flex;
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  `,
  ListIcon: styled.img`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
    position: relative;
    top: 2px;
    cursor: pointer;
  `,
  ListBox: styled.div`
    flex: 1 1 0%;
    overflow: hidden;
  `,
  ListBoxTop: styled.div`
    font-size: 12px;
    color: #333;
  `,
  ListBoxBottom: styled.div`
    font-size: 13px;
    margin-top: 2px;
  `,
  CommentTips: styled.div`
    backdrop-filter: blur(5px);
    font-size: 12px;
    font-weight: bold;
    padding: 5px 10px;
    text-align: center;
    & > i {
      margin-right: 5px;
      font-size: 13px;
    }
  `,
  LoginBtn: styled.div`
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 15px;
    & > i {
      font-size: 15px;
      margin-right: 5px;
    }
    :hover {
      color: #1892c1;
    }
  `,
}

// @ts-ignore
var editor: any = undefined

const T: React.FC = (props: any) => {
  const [aid, setAid] = useState("")
  const [targetUid, setTargetUid] = useState("")
  const [list, setList] = useState<any>([])
  const [userInfo, setUserInfo] = useState<any>({})
  const { setShowLogin } = useContext<any>(AppContext)

  useEffect(() => {
    // console.log({props})
    const { id, uid } = props
    setAid(id)
    setTargetUid(uid)
    getComments(id)

    try {
      // @ts-ignore
      const data = jwt(Cookies.get("twa"))
      // console.log(data)
      setUserInfo(data)
    } catch (e) {}
  }, [props])

  useEffect(() => {
    setTimeout(() => {
      editor = new E("#editor")
      editor.customConfig.menus = [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "emoticon",
        "code",
      ]
      const paopao = []
      for (let index = 0; index < 50; index++) {
        paopao.push({
          alt: `paopao${index}`,
          src: `${DOMAIN_STATIC}/paopao/qwe%20(${index + 1}).png`,
        })
      }
      const tusiji = []
      for (let index = 0; index < 29; index++) {
        tusiji.push({
          alt: `tusiji${index}`,
          src: `${DOMAIN_STATIC}/tusiji/${index + 1}.gif`,
        })
      }
      editor.customConfig.emotions = [
        {
          title: "泡泡",
          type: "image",
          content: paopao,
        },
        {
          title: "兔斯基",
          type: "image",
          content: tusiji,
        },
      ]
      editor.create()
    }, 100)
  }, [])

  const getComments = (id: any) => {
    GET_COMMENTS({ id }).then((rs) => {
      setList(rs)
    })
  }

  return (
    <>
      {userInfo.icon ? (
        <S.SB1>
          <div id="editor"></div>
          <S.FucBox>
            <S.FucBoxLeft />
            <S.FucBoxRight
              onClick={() => {
                if (
                  editor.txt.text() ||
                  editor.txt.html().indexOf("img") >= 0
                ) {
                  SET_COMMENT_SAVE({
                    aid,
                    targetUid,
                    content: editor.txt.html(),
                  }).then((rs) => {
                    editor.txt.clear()
                    getComments(props.id)
                  })
                }
              }}
            >
              PUBLISH
            </S.FucBoxRight>
          </S.FucBox>
        </S.SB1>
      ) : (
        <S.LoginBtn
          onClick={() => {
            // window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`
            setShowLogin(true)
          }}
        >
          <i className={"iconfont icon-leaf"} />
          Comments after login
        </S.LoginBtn>
      )}
      <S.CommentTips>- {list.length} comments -</S.CommentTips>
      {list.length > 0 && (
        <S.ListBody>
          {list.map((item: any, index: any) => {
            return (
              <S.List key={index}>
                <S.ListIcon
                  src={item.avatar_url || "--"}
                  onError={(e: any) => {
                    e.target.onerror = null
                    e.target.src = `${DOMAIN_STATIC}/icon/badimg.png`
                  }}
                  onClick={() => {
                    window.open(`#/users/${item.name}`)
                  }}
                />
                <S.ListBox>
                  <S.ListBoxTop>
                    {item.name || "Anonymous"}
                    <Dot />
                    {item.create_time}
                  </S.ListBoxTop>
                  <S.ListBoxBottom
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </S.ListBox>
              </S.List>
            )
          })}
        </S.ListBody>
      )}
    </>
  )
}

export default T

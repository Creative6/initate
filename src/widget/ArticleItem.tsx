import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Dot from "./Dot"
import jwt from "jwt-decode"
import Cookies from "js-cookie"
import { SET_ARTICLE_DELETE, DOMAIN_STATIC } from "../api"
import { AppContext } from "../App"

const S = {
  Content: styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    padding-bottom: 13px;
    border-bottom: 2px dashed rgb(185 185 185);
    margin: 15px;
  `,
  Imgbox: styled.div`
    padding-top: 3px;
  `,
  Img: styled.img`
    width: 40px;
    border-radius: 10px;
    margin-right: 12px;
    cursor: pointer;
  `,
  Box: styled.div`
    flex: 1;
  `,
  Title: styled.a`
    font-weight: bold;
    font-size: 17px;
    color: #222;
    margin-bottom: 5px;
    text-decoration: none;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  `,
  Information: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgb(68 68 68);
    padding: 5px 0px;
  `,
  PreviewContent: styled.div`
    font-size: 12px;
    color: rgb(0 0 0);
    line-height: 1.5;
    letter-spacing: 1px;
    word-break: break-all;
    background: rgb(204 204 204 / 0.22);
    padding: 10px;
    opacity: 0.8;
    border-left: 5px solid #ccc;
  `,
  CommentNum: styled.span`
    font-weight: bold;
    margin-right: 3px;
  `,
  Tag: styled.div`
    float: left;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    transition: all 0.2s;
    font-weight: bold;
    color: #666;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
    > i {
      font-size: 12px;
      margin-right: 3px;
    }
  `,
  NumTips: styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    background: #00000087;
    width: 30px;
    height: 30px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
  `,
  ImgContent: styled.div({
    width: 200,
    height: 200,
    background: "#000",
    marginRight: 5,
    marginBottom: 5,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.2s",
    opacity: 0.9,
    textAlign: "center",
  }),
  FucBtn: styled.div({
    padding: 5,
    transition: "all 0.2s",
    float: "right",
    marginLeft: 10,
    background: "#eee",
    cursor: "pointer",
    ":hover": {
      background: "#ccc",
    },
  }),
  Bofang: styled.i`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #fff;
  `,
}

const T: React.FC = (props: any) => {
  const {
    avatar_url,
    title,
    name,
    create_time,
    preview_content,
    preview_img,
    comment_num,
    id,
    simple,
    tag = "",
    uid,
    hidePersonInfo = false,
  } = props

  const [userInfo, setUserInfo] = useState<any>({})

  const { setArticleInfo, setShowPublish } = useContext<any>(AppContext)

  useEffect(() => {
    try {
      // @ts-ignore
      const data = jwt(Cookies.get("twa"))
      setUserInfo(data)
      console.log(data)
    } catch (e) {}
  }, [])

  return (
    <S.Content>
      {!hidePersonInfo && (
        <S.Imgbox>
          <S.Img
            src={avatar_url}
            onError={(e: any) => {
              e.target.onerror = null
              e.target.src = `${DOMAIN_STATIC}/icon/badimg.png`
            }}
            onClick={() => {
              window.open(`#/users/${name}`)
            }}
          />
        </S.Imgbox>
      )}
      <S.Box>
        <S.Title
          onClick={() => {
            window.open(`#/article/${id}`)
          }}
        >
          {title || "NO TITLE"}
        </S.Title>
        {simple && (
          <>
            {(userInfo.uid + "" === "1" ||
              uid + "" === userInfo.uid + "") && (
              <S.FucBtn
                onClick={() => {
                  setArticleInfo({ ...props, update: true })
                  setShowPublish(true)
                }}
              >
                <i className={"iconfont icon-edit"}></i>
              </S.FucBtn>
            )}
            {userInfo.uid + "" === "1" && (
              <S.FucBtn
                onClick={() => {
                  if (window.confirm("Delete?"))
                    SET_ARTICLE_DELETE({ id }).then(() => {
                      window.location.reload()
                    })
                }}
              >
                <i className={"iconfont  icon-delete"}></i>
              </S.FucBtn>
            )}
          </>
        )}
        <S.Information>
          {!hidePersonInfo ? (
            <div>
              {name}
              <Dot />
              {create_time}
            </div>
          ) : (
            <div>{create_time}</div>
          )}
          {comment_num > 0 && (
            <div>
              <S.CommentNum>{comment_num}</S.CommentNum>comment
              {comment_num > 1 && "s"}
            </div>
          )}
        </S.Information>
        {!simple && (preview_content || "").replace(/\s+/g, "") && (
          <S.PreviewContent>{preview_content}</S.PreviewContent>
        )}
        {!simple && preview_img && (
          <div style={{ marginTop: 5, display: "flex" }}>
            {preview_img.length > 0 &&
              preview_img.slice(0, 3).map((item: any, index: any) => (
                <S.ImgContent
                  key={index}
                  onClick={() => {
                    window.open(item.replace("?x-oss-process=style/small", ""))
                  }}
                >
                  {item.indexOf("file_type=video") > 0 ? (
                    <video src={item} />
                  ) : (
                    <img
                      src={item}
                      onError={(e: any) => {
                        e.target.onerror = null
                        e.target.src = `${DOMAIN_STATIC}/icon/badimg.png`
                      }}
                      alt=""
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                        width: "100%",
                        transition: "all 0.2s",
                      }}
                    />
                  )}
                  {item.indexOf("file_type=video") > 0 && (
                    <S.Bofang className={"iconfont icon-bofang"} />
                  )}
                  {preview_img.length > 3 && index === 2 && (
                    <S.NumTips>{preview_img.length}</S.NumTips>
                  )}
                </S.ImgContent>
              ))}
          </div>
        )}
        <div style={{ overflow: "hidden" }}>
          {tag &&
            tag.split("|").map((item: any, index: any) => (
              <S.Tag
                key={index}
                onClick={() => {
                  if (window.location.href.indexOf("searchresult") >= 0) {
                    window.location.replace(`#/searchresult/${item}`)
                  } else {
                    window.open(`#/searchresult/${item}`)
                  }
                }}
              >
                <i className={"iconfont icon-tag"} />
                {item}
              </S.Tag>
            ))}
        </div>
      </S.Box>
    </S.Content>
  )
}

export default T

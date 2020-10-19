import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { GET_ARTICLE_INFO } from "../api"
import ArticleItem from "../widget/ArticleItem"
import CommentBox from "../widget/CommentBox"
import MoreForUser from "../widget/MoreForUser"
import MoreLikeThis from "../widget/MoreLikeThis"
import Loading from "../widget/Loading"
import "braft-editor/dist/output.css"

const S: any = {
  BodyLeft: styled.div`
    width: 700px;
    background: rgb(255 255 255 / 88%);
    overflow: hidden;
  `,
  BodyRight: styled.div`
    position: relative;
    padding-left: 10px;
    flex: 1;
    padding-left: 20px;
  `,
  StickyBox: styled.div`
    width: 280px;
    position: sticky;
    top: 20px;
  `,
  Content: styled.div`
    backdrop-filter: blur(5px);
    width: 100%;
    font-size: 13px;
  `,
  ContentBox: styled.div`
    padding: 20px;
    padding-top: 0px;
  `,
  TextArea: styled.textarea`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
    font-family: unset;
    height: 100px;
    resize: none;
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
}

const T: React.FC = (props: any) => {
  const [info, setInfo] = useState<any>("")

  useEffect(() => {
    const { match } = props
    const { params } = match
    const { id } = params
    GET_ARTICLE_INFO({ id })
      .then((rs: any) => {
        setInfo(rs)
        document.title = rs.title || "NO TITLE"
      })
      .catch(() => {
        setInfo({})
      })
  }, [props])

  return (
    <>
      {!info ? (
        <Loading />
      ) : Object.keys(info).length > 0 ? (
        <>
          <S.BodyLeft>
            <S.Content>
              <ArticleItem {...info} simple={true} />
              <S.ContentBox
                className="braft-output-content"
                dangerouslySetInnerHTML={{ __html: info.content }}
              />
              <div style={{ padding: "0px 10px" }}>
                <CommentBox {...info} />
              </div>
            </S.Content>
          </S.BodyLeft>
          <S.BodyRight>
            <S.StickyBox>
              <div style={{ background: "rgb(255 255 255 / 88%)" }}>
                {info.uid && <MoreForUser uid={info.uid} id={info.id} />}
              </div>
              <div
                style={{ background: "rgb(255 255 255 / 88%)", marginTop: 10 }}
              >
                {info.uid && (
                  <MoreLikeThis
                    title={info.title}
                    id={info.id}
                    tag={info.tag}
                  />
                )}
              </div>
            </S.StickyBox>
          </S.BodyRight>
        </>
      ) : (
        <Loading text={"- This article does not exist -"} />
      )}
    </>
  )
}

export default T

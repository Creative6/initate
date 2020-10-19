import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GET_ARTICLE_BY_KEYWORD } from "../api"
import NumberDot from "./NumberDot"
import Loading from "../widget/Loading"

const S = {
  Item: styled.div`
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 13px;
    justify-content: space-between;
    padding: 0px 15px;
    transition: 0.2s;
    cursor: pointer;
    :hover {
      background: #e2e3ec;
    }
  `,
  Title: styled.div`
    backdrop-filter: blur(5px);
    color: #000;
    height: 35px;
    line-height: 35px;
    text-indent: 15px;
    font-size: 14px;
    > i {
      margin-right: 5px;
      font-size: 13px;
    }
  `,
  Num: styled.span`
    font-weight: bold;
    color: mediumseagreen;
  `,
  TitleWarp: styled.div`
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}

const T: React.FC<any> = (props: any) => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    GET_ARTICLE_BY_KEYWORD({
      title: props.title,
      id: props.id,
      tag: props.tag,
    }).then((rs: any) => {
      setData(rs)
    })
  }, [props.id, props.tag, props.title])

  return (
    <>
      <S.Title>
        <i className={"iconfont icon-more2"} />
        MoreLikeThis -
      </S.Title>
      {!data ? (
        <Loading />
      ) : data.length > 0 ? (
        data.map((item: any, index: number) => {
          return (
            <S.Item
              key={index}
              onClick={() => {
                window.open(`#/article/${item.id}`)
              }}
            >
              <div style={{ display: "flex" }} title={item.title}>
                <NumberDot num={index + 1} />
                <S.TitleWarp>{item.title || "NO TITLE"}</S.TitleWarp>
              </div>
              <div>
                <S.Num>{item.count}</S.Num> comments
              </div>
            </S.Item>
          )
        })
      ) : (
        <div style={{ padding: 15, fontSize: 13, color: "#aaa" }}>NOTHING</div>
      )}
    </>
  )
}

export default T

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GET_TAGS } from "../api"

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
      background: #eee;
    }
  `,
  Title: styled.div`
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
  Tag: styled.div`
    font-size: 13px;
    margin: 3px;
    cursor: pointer;
    transition: all 0.2s;
    padding: 3px 8px;
    background: #eee;
    color: #666;
    :hover {
      background: #ccc;
      color: #000;
    }
    > i {
      font-size: 12px;
      margin-right: 3px;
    }
  `,
}

const T: React.FC<any> = () => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    GET_TAGS().then((rs: any) => {
      setData(rs.slice(0, 10))
    })
  }, [])

  // const colorList: any = ['palevioletred', 'orange', 'cornflowerblue']

  return (
    <>
      <S.Title>
        <i className={"iconfont icon-tag"} />
        Tags [TOP 10] -
      </S.Title>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          flexWrap: "wrap",
          padding: 10,
          paddingTop: 0,
        }}
      >
        {data &&
          data.map((item: any, index: any) => (
            <S.Tag
              key={index}
              // style={{ background: colorList[index] || '#bfa7ba' }}
              onClick={() => {
                if (window.location.href.indexOf("searchresult") >= 0) {
                  window.location.replace(`#/searchresult/${item.name}`)
                } else {
                  window.open(`#/searchresult/${item.name}`)
                }
              }}
            >
              {/* <i className={'iconfont icon-tag'} /> */}
              {item.name}-{item.num}
            </S.Tag>
          ))}
      </div>
    </>
  )
}

export default T

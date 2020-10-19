import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GET_PERSON_ACTIVE_RANKINGS } from "../api"
import NumberDot from "./NumberDot"

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
    color: #0008ff;
  `,
}

const T: React.FC = () => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    GET_PERSON_ACTIVE_RANKINGS().then((rs: any) => {
      setData(rs)
    })
  }, [])

  return (
    <>
      <S.Title>
        <i className={"iconfont icon-rankfill"} />
        PersonActiveRankings -
      </S.Title>
      {data &&
        data.map((item: any, index: number) => {
          return (
            <S.Item
              key={index}
              onClick={() => {
                window.open(`#/users/${item.name}`)
              }}
            >
              <div>
                <NumberDot num={index + 1} />
                {item.name}
              </div>
              <div>
                <S.Num>{item.count}</S.Num> releases
              </div>
            </S.Item>
          )
        })}
    </>
  )
}

export default T

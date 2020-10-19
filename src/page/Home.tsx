import React from "react"
import styled from "styled-components"
import ArticleList from "../widget/ArticleList"
import PersonActiveRankings from "../widget/PersonActiveRankings"
import NewsPopularity from "../widget/NewsPopularity"
import My from "../widget/My"
import Tags from "../widget/Tags"

const S: any = {
  BodyLeft: styled.div`
    width: 700px;
    background: rgb(255 255 255 / 88%);
    backdrop-filter: blur(5px);
    overflow: hidden;
  `,
  BodyRight: styled.div`
    position: relative;
    padding-left: 10px;
    flex: 1;
    padding-left: 20px;
  `,
  StickyBox: styled.div`
    width: 100%;
    position: sticky;
    top: 20px;
  `,
  StickyBoxChild: styled.div`
    margin-top: 15px;
    background: rgb(255 255 255 / 88%);
    color: #000;
    backdrop-filter: blur(5px);
  `,
  MyBox: styled.div`
    background: rgb(255 255 255 / 88%);
    backdrop-filter: blur(5px);
    width: 100%;
  `,
}

const T: React.FC = () => {
  return (
    <>
      <S.BodyLeft>
        <ArticleList />
      </S.BodyLeft>
      <S.BodyRight>
        <S.MyBox>
          <My />
        </S.MyBox>
        <S.StickyBox>
          <S.StickyBoxChild>
            <NewsPopularity />
          </S.StickyBoxChild>
          <S.StickyBoxChild>
            <PersonActiveRankings />
          </S.StickyBoxChild>
          <S.StickyBoxChild>
            <Tags />
          </S.StickyBoxChild>
        </S.StickyBox>
      </S.BodyRight>
    </>
  )
}

export default T

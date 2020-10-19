import React, { createContext, useState } from "react"
import styled from "styled-components"
import Header from "./widget/Header"
import NotFound from "./page/NotFound"
import Publish from "./widget/Publish"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import bg from "./assets/bg.jpg"

const S: any = {
  Container: styled.div`
    display: flex;
    background: url(${bg});
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    flex-direction: column;
  `,
  Body: styled.div`
    flex: 1;
    overflow: auto;
  `,
  BodyContent: styled.div`
    width: 1000px;
    margin: 20px auto;
    display: flex;
  `,
}

export const AppContext = createContext({})

const T: React.FC = () => {
  const [showPublish, setShowPublish] = useState(false)
  const [articleInfo, setArticleInfo] = useState({})

  const Home = React.lazy(() => import("./page/Home"))
  const ArticleInfo = React.lazy(() => import("./page/ArticleInfo"))
  const Message = React.lazy(() => import("./page/Message"))
  const SearchResult = React.lazy(() => import("./page/SearchResult"))
  const NoPermission = React.lazy(() => import("./page/NoPermission"))
  const Users = React.lazy(() => import("./page/Users"))

  return (
    <AppContext.Provider
      value={{ setShowPublish, showPublish, setArticleInfo, articleInfo }}
    >
      <React.Suspense
        fallback={
          <S.Container>
            <Header />
            <S.Body />
          </S.Container>
        }
      >
        <S.Container>
          <Publish showPublish={showPublish} />
          <Header />
          <S.Body>
            <S.BodyContent>
              <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/article/:id" component={ArticleInfo} />
                  <Route path="/message" component={Message} />
                  <Route
                    path="/searchresult/:keyword"
                    component={SearchResult}
                  />
                  <Route path="/nopermission" component={NoPermission} />
                  <Route path="/users/:name" component={Users} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </S.BodyContent>
            {/* <Login /> */}
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                padding: 10,
                color: "#000",
              }}
            >
              -- Powered by Flower ©2020 --
              <br />
              <a
                href="http://www.beian.miit.gov.cn/"
                style={{ textDecoration: "none", color: "#000" }}
              >
                苏ICP备19039887号
              </a>
            </div>
          </S.Body>
        </S.Container>
      </React.Suspense>
    </AppContext.Provider>
  )
}

export default T

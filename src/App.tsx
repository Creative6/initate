import React, { createContext, useState } from "react"
import styled from "styled-components"
import Header from "./widget/Header"
import NotFound from "./page/NotFound"
import Publish from "./widget/Publish"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import bg from "./assets/bg.jpg"
import Home from "./page/Home"
import ArticleInfo from "./page/ArticleInfo"
import Message from "./page/Message"
import SearchResult from "./page/SearchResult"
import NoPermission from "./page/NoPermission"
import Users from "./page/Users"
import LoginPop from "./widget/LoginPop"
import Redirect from "./page/Redirect"

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
  const [showLogin, setShowLogin] = useState(false)

  return (
    <AppContext.Provider
      value={{
        setShowPublish,
        showPublish,
        setArticleInfo,
        articleInfo,
        setShowLogin,
      }}
    >
      <S.Container>
        <Publish showPublish={showPublish} />
        <LoginPop show={showLogin} setShowLogin={setShowLogin} />
        <Header />
        <S.Body>
          <S.BodyContent>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/article/:id" component={ArticleInfo} />
                <Route path="/message" component={Message} />
                <Route path="/searchresult/:keyword" component={SearchResult} />
                <Route path="/nopermission" component={NoPermission} />
                <Route path="/users/:name" component={Users} />
                <Route path="/redirect" component={Redirect} />
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
            <span style={{ textDecoration: "none", color: "#000" }}>
              Initating Spin V1.01
            </span>
          </div>
        </S.Body>
      </S.Container>
    </AppContext.Provider>
  )
}

export default T

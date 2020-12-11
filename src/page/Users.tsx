import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { GET_ARTICLES_BY_USER, GET_USERINFO_BY_NAME, GET_FOLLOWING, GET_FOLLOWERS, SET_FOLLOW, GET_MY_FOLLOWS, DOMAIN_STATIC } from '../api'
import ArticleItem from '../widget/ArticleItem'
import Loading from '../widget/Loading'
import UserItem from '../widget/UserItem'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'
import { AppContext } from '../App'

const S: any = {
  Content: styled.div`
    width: 800px;
    background: rgb(255 255 255 / 88%);
    backdrop-filter: blur(5px);
    overflow: hidden;
    margin: 0 auto;
  `,
  Empty: styled.div`
    text-align: center;
    margin: 10px;
    font-size: 13px;
  `,
  Num: styled.span`
    font-weight: bold;
  `,
  Loading: styled.div`
    text-align: center;
    width: 100%;
  `,
  UserInfoContent: styled.div`
    position: relative;
    background: url(${DOMAIN_STATIC}/34669673/1583806297795bg2.png);
    background-size: 100%;
    background-position-y: 361px;
    height: 200px;
    margin-bottom: 20px;
  `,
  UserIcon: styled.img`
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -41px;
    left: 30px;
    border-radius: 100px;
  `,
  UserName: styled.div`
    position: absolute;
    color: #fff;
    font-size: 21px;
    bottom: 22px;
    left: 140px;
  `,
  UserEmail: styled.div`
    position: absolute;
    color: #c3c3c3;
    font-size: 14px;
    bottom: 4px;
    left: 140px;
  `,
  FucBtn: styled.div`
    position: absolute;
    color: #c3c3c3;
    font-size: 14px;
    bottom: 11px;
    right: 21px;
    border: 1px solid #ccc;
    padding: 3px 10px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
      background: #ffffff3d;
      color: #fff;
    }
  `,
  TagBtnBox: styled.div`
    overflow: hidden;
    width: 300px;
    margin: 0 auto;
  `,
  TagBtn: styled.div`
    font-size: 14px;
    float: left;
    width: 100px;
    text-align: center;
    padding-bottom: 5px;
    border-bottom: 2px solid #fff;
    transition: all 0.2s;
    color: #aaa;
    cursor: pointer;
    :hover {
      color: #333;
    }
    &.active {
      color: #333;
      border-bottom: 2px solid #000;
    }
  `
}

const searchArr = ['', '?following', '?followers']

const T: React.FC<any> = (props: any) => {
  const { setShowLogin } = useContext<any>(AppContext)

  const { match, history } = props
  const { location } = history
  const { search } = location
  const { params } = match
  const { name } = params

  const [index, setIndex] = useState(searchArr.indexOf(search))
  const [userinfo, setUserinfo] = useState<any>({})
  const [loginData, setLoginData] = useState<any>({})
  const [isLogin, setIsLogin] = useState(false)
  const [list, setList] = useState<any>('')
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [isMe, setIsMe] = useState(false)
  const [myFollowing, setMyFollowing] = useState<any>([])
  const [myFollowers, setMyFollowers] = useState<any>([])

  useEffect(() => {
    try {
      //@ts-ignore
      const res = jwt(Cookies.get('twa'))
      console.log(res)
      //@ts-ignore
      const { uid = '', name: jname = '' } = res
      if (uid) {
        setLoginData(res)
        setIsLogin(true)
        GET_MY_FOLLOWS().then((rs: any) => {
          const { following = [], followers = [] } = rs
          const _following: any = []
          const _followers: any = []
          following.forEach((item: any) => _following.push(item.target_uid))
          followers.forEach((item: any) => _followers.push(item.uid))
          setMyFollowing(_following)
          setMyFollowers(_followers)
        })
      }
      if (jname === name) {
        setIsMe(true)
      } else {
        setIsMe(false)
      }
    } catch (error) {
      console.log('GET LOGIN DATA FAIL')
    }

    GET_USERINFO_BY_NAME({ name }).then((rs: any) => {
      setUserinfo(rs[0])
    })
    GET_ARTICLES_BY_USER({ name }).then((rs: any) => {
      setList(rs)
    })
    GET_FOLLOWING({ name }).then((rs: any) => {
      setFollowing(rs)
    })
    GET_FOLLOWERS({ name }).then((rs: any) => {
      setFollowers(rs)
    })
  }, [name])

  const changeIndex = (i: any) => {
    if (i === index) return
    setIndex(i)
    window.location.href = `#/users/${name}${searchArr[i]}`
  }

  const getMyFollows = () => {
    GET_MY_FOLLOWS().then((rs: any) => {
      const { following = [], followers = [] } = rs[0]
      const _following: any = []
      const _followers: any = []
      following.forEach((item: any) => _following.push(item.target_uid))
      followers.forEach((item: any) => _followers.push(item.uid))
      console.log({ following, followers })
      setMyFollowing(_following)
      setMyFollowers(_followers)
    })
  }

  const setFollow = (uid: any, type: any) => {
    SET_FOLLOW({ target_uid: uid, type: type }).then(() => {
      getMyFollows()
    })
  }

  return (
    <>
      {Object.keys(userinfo || {}).length > 0 ? (
        <S.Content>
          <S.UserInfoContent>
            <S.UserIcon src={userinfo.avatar_url} alt="" />
            <S.UserName>{userinfo.name || 'UNKNOW'}</S.UserName>
            <S.UserEmail>
              {userinfo.email || 'NOEmail'},Following - {following.length}
              ,Followers - {followers.length}
            </S.UserEmail>
            {isLogin && !isMe && <S.FucBtn>{myFollowing.indexOf(userinfo.uid) >= 0 ? 'UNFOLLOW' : 'FOLLOW'}</S.FucBtn>}
            {!isLogin && (
              <S.FucBtn
                onClick={() => {
                  // window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`
                  setShowLogin(true)
                }}
              >
                FOLLOW
              </S.FucBtn>
            )}
          </S.UserInfoContent>

          <S.TagBtnBox>
            <S.TagBtn
              onClick={() => {
                changeIndex(0)
              }}
              className={index === 0 && 'active'}
            >
              Releases
            </S.TagBtn>
            <S.TagBtn
              onClick={() => {
                changeIndex(1)
              }}
              className={index === 1 && 'active'}
            >
              Following
            </S.TagBtn>
            <S.TagBtn
              onClick={() => {
                changeIndex(2)
              }}
              className={index === 2 && 'active'}
            >
              Followers
            </S.TagBtn>
          </S.TagBtnBox>
          {index === 0 &&
            (!list ? (
              <Loading />
            ) : list.length <= 0 ? (
              <Loading text="- No Release -" />
            ) : (
              <div>
                {list.map((item: any, index: any) => {
                  return <ArticleItem key={index} {...item} hidePersonInfo />
                })}
              </div>
            ))}
          {index === 1 &&
            (!following ? (
              <Loading />
            ) : following.length <= 0 ? (
              <Loading text="- No Following -" />
            ) : (
              <div>
                {following.map((item: any, index: any) => {
                  return (
                    <UserItem
                      key={index}
                      {...item}
                      originUid={item.target_uid}
                      isMe={loginData.uid === item.target_uid}
                      isLogin={isLogin}
                      isMyFollowing={myFollowing.indexOf(item.target_uid) >= 0}
                      isMyFollowers={myFollowers.indexOf(item.target_uid) >= 0}
                      setFollow={setFollow}
                    />
                  )
                })}
              </div>
            ))}
          {index === 2 &&
            (!followers ? (
              <Loading />
            ) : followers.length <= 0 ? (
              <Loading text="- No Followers -" />
            ) : (
              <div>
                {followers.map((item: any, index: any) => {
                  return (
                    <UserItem
                      key={index}
                      {...item}
                      originUid={item.uid}
                      isMe={loginData.uid === item.uid}
                      isLogin={isLogin}
                      isMyFollowing={myFollowing.indexOf(item.uid) >= 0}
                      isMyFollowers={myFollowers.indexOf(item.uid) >= 0}
                      setFollow={setFollow}
                    />
                  )
                })}
              </div>
            ))}
        </S.Content>
      ) : (
        <Loading text="- User does not exist -" />
      )}
    </>
  )
}

export default T

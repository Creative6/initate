import { get, fileUpload, post } from './axios'
import CONFIG from './github_config'

export const DOMAIN_STATIC = 'https://static.taswell.cn'
export const DOMAIN_API = 'https://api.taswell.cn'
export const config = CONFIG

export const GET_ARTICLES = (para?: any) => get('/blog/articles', para)
export const GET_PERSON_ACTIVE_RANKINGS = (para?: any) => get('/blog/person_active_rankings', para)
export const GET_ARTICLE_POPULARITY = (para?: any) => get('/blog/article_popularity', para)
export const GET_ARTICLE_INFO = (para?: any) => get('/blog/article_info', para)
export const SET_COMMENT_SAVE = (para?: any) => get('/blog/comment_save', para)
export const GET_COMMENTS = (para?: any) => get('/blog/comments', para)
export const GET_NOTICES = (para?: any) => get('/blog/notices', para)
export const GET_NOTICE_NUM = (para?: any) => get('/blog/notice_num', para)
export const UPLOAD = (para?: any) => fileUpload('/blog/upload', para)
export const SET_ARTICLE_SAVE = (para?: any) => post('/blog/save', para)
export const SET_ARTICLE_UPDATE = (para?: any) => post('/blog/update', para)
export const SET_ARTICLE_DELETE = (para?: any) => post('/blog/delete', para)
export const SET_NOTICE_READ = (para?: any) => get('/blog/notice_read', para)
export const GET_SEARCH_RESULT = (para?: any) => get('/blog/search', para)
export const GET_ARTICLE_BY_UID = (para?: any) => get('/blog/user_articles', para)
export const GET_ARTICLE_BY_KEYWORD = (para?: any) => get('/blog/keyword_articles', para)
export const GET_TAGS = (para?: any) => get('/blog/tags', para)
export const SET_FOLLOW = (para?: any) => get('/users/follow', para)
export const GET_ARTICLES_BY_USER = (para?: any) => get('/blog/articles_by_user', para)
export const GET_USERINFO_BY_NAME = (para?: any) => get('/users/userinfo_by_name', para)
export const GET_FOLLOWING = (para?: any) => get('/users/following', para)
export const GET_FOLLOWERS = (para?: any) => get('/users/followers', para)
export const GET_MY_FOLLOWS = (para?: any) => get('/users/my_follows', para)

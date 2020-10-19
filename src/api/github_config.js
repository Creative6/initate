const config = {
  oauth_uri: "https://github.com/login/oauth/authorize",
  redirect_uri: "https://api.taswell.cn/github_login",
  client_id: "5264e5de73487b1b7a35",
  client_secret: "5141fc48c7969eeda83de52657759ed39e251881",
}

// 本地开发环境下
if (process.env.NODE_ENV === "development") {
  config.redirect_uri = "http://localhost:5679/github_login"
  config.client_id = "fcde7b0158dea264cf6e"
  config.client_secret = "5cf4eb85143b2f8947dd0e4762e9eb00a5ad40ca"
}
export default config

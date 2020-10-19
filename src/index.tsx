import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

console.log("---------------------------")
if (localStorage.getItem("last_url")) {
  const url: any = localStorage.getItem("last_url")
  localStorage.removeItem("last_url")
  window.location.replace(url)
}

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

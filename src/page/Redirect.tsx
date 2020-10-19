import React, { useEffect } from "react"
import Loading from "../assets/loadingBar.svg"
import { useLocation, useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import qs from "querystring"

const T: React.FC = () => {
  const history = useHistory()
  const params = useLocation()

  useEffect(() => {
    const { search } = params
    const twa = qs.parse(search.slice(1))
    Cookies.set("twa", twa, {
      expires: 7,
    })
    if (localStorage.getItem("last_url")) {
      const url: any = localStorage.getItem("last_url")
      localStorage.removeItem("last_url")
      window.location.replace(url)
    } else {
      history.push("/")
    }
  }, [params, history])

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <img src={Loading} alt="" style={{ width: 50 }} />
    </div>
  )
}

export default T

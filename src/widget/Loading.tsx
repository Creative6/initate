import * as React from "react"

const T: React.FC<any> = (props) => {
  const { text = "Loading" } = props

  return (
    <div
      style={{
        fontSize: 15,
        textAlign: "center",
        width: "100%",
        padding: 10,
      }}
    >
      {text === "Loading" && (
        <img
          src={require("../assets/loadingBar.svg")}
          alt=""
          style={{
            width: 40,
            // position: "absolute",
            // marginLeft: -22,
            // marginTop: -1,
          }}
        />
      )}
      <div>{text}</div>
    </div>
  )
}

export default T

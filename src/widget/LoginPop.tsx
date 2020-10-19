import React from "react"
import styled from "styled-components"
import Login from "./Login"

const S = {
  Back: styled.div<any>`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: start;
    justify-content: center;
    opacity: ${(props) => (props.show ? 1 : 0)};
    visibility: ${(props) => (props.show ? "unset" : "hidden")};
    transition: 0.2s;
  `,
  Content: styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 0.3);
  `,
  CancelBtn: styled.div`
    text-align: center;
    cursor: pointer;
    margin: 10px;
    :hover {
      text-decoration: underline;
    }
  `,
}

const T: React.FC<any> = ({ show, setShowLogin }) => {
  return (
    <S.Back show={show}>
      <S.Content>
        <Login />
        <S.CancelBtn
          onClick={() => {
            setShowLogin(false)
          }}
        >
          Cancel
        </S.CancelBtn>
      </S.Content>
    </S.Back>
  )
}

export default T

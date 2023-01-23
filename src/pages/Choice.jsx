import React from "react"
import useAuth from "../custom-hooks/useAuth"

import Checkout from "./Checkout"
import Login from "./Login"
function Choice() {
  const { currentUser } = useAuth()

  return <div>{currentUser ? <Checkout /> : <Login />}</div>
}

export default Choice

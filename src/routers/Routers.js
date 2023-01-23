import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Home from "../pages/Home"
import Choice from "../pages/Choice"
import Login from "../pages/Login"
import ProductDetails from "../pages/ProductDetails"
import Shop from "../pages/Shop"
import New from "../pages/New"
import { userInputs } from "../formSource"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"
const Routers = () => {
  const { currentUser } = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  }
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/choice" element={<Choice />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="new"
        element={
          <RequireAuth>
            <New inputs={userInputs} title="Add New User" />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/new" element={<New />} />
    </Routes>
  )
}

export default Routers

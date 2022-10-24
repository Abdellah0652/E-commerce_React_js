import React, { useRef, useEffect } from "react"
import "./header.css"
import { Row, Container } from "reactstrap"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"
import { useSelector } from "react-redux"
const nav__link = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "cart", display: "Cart" }
]

export default function Header() {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky__header")
      } else {
        headerRef.current.classList.remove("sticky__header")
      }
    })
  }
  useEffect(() => {
    stickyHeaderFunc()
    return () => window.removeEventListener("scroll", stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle("active__menu")
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <motion.img whileTap={{ scale: 1.3 }} src={logo} alt="" />
              <div>
                <h1>M</h1>
                <p>Since 1995</p>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink className={navClass => (navClass.isActive ? "nav__active" : "")} to={item.path}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon">
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>{" "}
              <span>
                <motion.img whileTap={{ scale: 1.3 }} src={userIcon} alt="" />
              </span>{" "}
              <div className="mobile__menu">
                <span>
                  <i onClick={menuToggle} className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

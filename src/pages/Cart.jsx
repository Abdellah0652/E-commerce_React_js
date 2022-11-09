import React from "react"
import "../styles/cart.css"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import { Container, Row, Col } from "reactstrap"
import tdImg from "../assets/images/arm-chair-01.jpg"
import { cartActions } from "../redux/slices/cartSlice"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
export default function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping cart " />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2>no product added to cart</h2>
              ) : (
                <table className="table bordred">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="gap-5 d-flex align-items-center justify-content-beetwen">
                  subTotal <span className="gap-5 fs-4 fw-bold ">${totalAmount}</span>
                </h6>
              </div>
              <p>taxes and shipping will calculate</p>
              <div>
                <button className="buy__btn">
                  <Link to="/shop"> continue shopping</Link>
                </button>
                <button className="buy__btn">
                  <Link to="/checkout"> checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}
function Tr({ item }) {
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <tr>
      <td>
        <img src={item.imgUrl} />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <i onClick={deleteProduct} className="ri-delete-bin-line"></i>
      </td>
    </tr>
  )
}

import React from "react"
import { useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { cartActions } from "../redux/slices/cartSlice"
import { Container, Col, Row } from "reactstrap"
import { useParams } from "react-router-dom"
import Helmet from "../components/Helmet/Helmet"
import ProductsList from "../components/UI/ProductsList"
import products from "../assets/data/products"
import CommonSection from "../components/UI/CommonSection"
import "../styles/product-details.css"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useState } from "react"
export default function ProductDetails() {
  const [tab, setTab] = useState("desc")
  const reviewUser = useRef("")
  const reviewMsg = useRef("")
  const [rating, setRating] = useState(null)
  const { id } = useParams()
  const product = products.find(item => item.id === id)

  const { imgUrl, productName, price, avgRating, reviews, description, category, shortDesc } = product

  const relatedProducts = products.filter(item => item.category === category)
  const dispatch = useDispatch()
  const submitHandler = e => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }
    console.log(reviewObj)
    toast.success("review added successfuly")
  }

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price
      })
    )
    toast.success("product added successfully ")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2> {productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span>) ratings
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price"> ${price}</span>
                  <span>category:{category.toUpperCase()}</span>
                </div>{" "}
                <p>{shortDesc}</p>
                <motion.button onClick={addToCart} whileTap={{ scale: 1.2 }} className="buy__btn">
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 onClick={() => setTab("desc")} className={`${tab === "desc" ? "active__tab" : ""}`}>
                  Description
                </h6>
                <h6 onClick={() => setTab("rev")} className={`${tab === "rev" ? "active__tab" : ""}`}>
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mt-4">
                          <h6>abdellah</h6>
                          <span>{item.rating}(rating )</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave Your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter name " ref={reviewUser} />
                        </div>
                        <div className="form__group d-flex align-items-center gap-3">
                          <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(1)}>
                            <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(2)}>
                            <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(3)}>
                            <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(4)}>
                            <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(5)}>
                            <i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea ref={reviewMsg} rows={4} type="text" placeholder="review message here ...." />
                        </div>
                        <button type="submit" className="buy__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

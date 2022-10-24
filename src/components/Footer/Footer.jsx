import React from "react"
import "./footer.css"
import { Link } from "react-router-dom"
import logo from "../../assets/images/eco-logo.png"
import { motion } from "framer-motion"

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap"
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            {" "}
            <div className="logo">
              <div>
                <h1 className="text-white">M</h1>
                <p>Since 1995</p>
              </div>
            </div>{" "}
            <p className="footer__text mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim iste animi molestias laudantium dolore quaerat magnam, quibusdam temporibus laboriosam?</p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title"> Top catergories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            {" "}
            <div className="footer__quick-links">
              <h4 className="quick__links-title"> Use Full Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title"> Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-4">
                  <span>
                    <i className="ri-map-pin-line"></i>
                    <p>Maroc ,casa,sidibelyout 20015</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i className="ri-phone-line"></i>
                    <p>+21260-1804131</p>
                  </span>{" "}
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i className="ri-mail-line"></i>
                    <p>abdellah.targaoui@gmail.com</p>
                  </span>{" "}
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col>
            <p className="footer__copyright">copyright {year} devloped by Abdellah targaoui all right reserved </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

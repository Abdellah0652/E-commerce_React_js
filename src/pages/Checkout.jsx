import React, { useState } from "react"
import Geolocation from "react-geolocation"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import "./../styles/checkout.css"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
export default function Checkout() {
  const [famillyName, setFamillyName] = useState()
  const [name, setName] = useState()
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const [adress, setAdress] = useState()
  const [aditionalAdress, setAddionalAdress] = useState()
  const [cordinate, setCordinate] = useState()
  const [phone, setPhone] = useState()
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <Container>
        <Row>
          <Col lg="6">
            <div>
              <Form>
                <h5>Billing informations: </h5>
                <FormGroup className=" form-group">
                  <input required className="input-form" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Your name   " />
                </FormGroup>
                <FormGroup className=" form-group">
                  <input required className="input-form" type="text" value={famillyName} onChange={e => setFamillyName(e.target.value)} placeholder=" Enter Your familly name  " />
                </FormGroup>
                <FormGroup className="form-group">
                  <input required className="input-form" type="text" value={adress} onChange={e => setAdress(e.target.value)} placeholder="Your adress" />
                </FormGroup>
                <FormGroup className=" form-group">
                  <input required className="input-form" type="text" value={aditionalAdress} onChange={e => setAddionalAdress(e.target.value)} placeholder="Your additional adress" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Geolocation
                    className="col-md-6 form-group"
                    render={({
                      position: { coords: { latitude, longitude } = {} } = {},

                      error,
                      getCurrentPosition
                    }) => (
                      <div>
                        <input required className="input-form" desabled type="text" onChange={e => setCordinate(e.target.value)} value={latitude + ":" + longitude} placeholder="Your position cordinate" />

                        {error && <div>{error.message}</div>}
                      </div>
                    )}
                  />
                </FormGroup>
                <FormGroup className=" form-group">
                  <input required className="input-form" type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number " />
                </FormGroup>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="col-md-5 order-md-2">
              <h6 className="gap-5 d-flex align-items-center justify-content-beetwen">
                subTotal <span className="gap-5 fs-4 fw-bold ">${totalAmount}</span>
              </h6>
            </div>
            <p>taxes and shipping will calculate</p>
            <div>
              <button className="buy__btn">
                <Link to="/checkout"> Ordre Command</Link>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  )
}

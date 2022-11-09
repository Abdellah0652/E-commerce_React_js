import React, { useState } from "react"
import "../styles/login.css"
import { Link } from "react-router-dom"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { async } from "@firebase/util"
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      setLoading(false)
      toast.success(" user logged")
      navigate("/checkout")
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading ...........</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4">
                  <Form className="auth__form" onSubmit={signIn}>
                    <FormGroup className="form__group">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <button className="buy__btn auth__btn">Login</button>
                    <p>
                      dont have account <Link to="/signup">Create account</Link>
                    </p>
                  </Form>
                </h3>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

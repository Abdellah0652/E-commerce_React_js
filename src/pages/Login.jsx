import React, { useState } from "react"
import "../styles/login.css"
import { Link } from "react-router-dom"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import firebase from "firebase/compat/app"
import { auth, db } from "../firebase.config"
import "firebase/compat/auth"
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const navitage = useNavigate()
  const [error, setError] = useState(false)

  const signIn = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      setLoading(false)
      toast.success(" user logged" + user)
      navigate("/checkout")
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }
  // const googleLogin = () => {
  //   console.log("clicked")
  //   const provider = new firebase.auth.GoogleAuthProvider()
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(function (result) {
  //       if (result.user.uid.exists) {
  //         console.log("already hee")
  //       } else {
  //         setDoc(doc(db, "users", result.user.uid), {
  //           id: result.user.uid,
  //           displayName: result.user.displayName,
  //           email: result.user.email,
  //           photoURL: result.user.photoURL,
  //           timeStamp: serverTimestamp()
  //         })
  //           .then(function () {
  //             console.log("Document successfully written!")
  //             navitage("/")
  //           })
  //           .catch(function (error) {
  //             console.error("Error writing document: ", error)
  //           })
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("--->" + error)
  //     })
  // }
  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // Handle successful sign in
        const user = result.user
        console.log(user)
      })
      .catch(error => {
        // Handle error
        console.error(error)
      })
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
                  <Form className="auth__form">
                    <FormGroup className="form__group">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <button className="buy__btn auth__btn" onClick={signIn}>
                      Login
                    </button>

                    {error && <span>Wrong email or password!</span>}
                    <p>
                      dont have account <Link to="/new">Create account</Link>
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

import React, { useState, useRef } from "react"
import "../styles/sign-up.css"
import { Link } from "react-router-dom"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { setDoc, doc } from "firebase/firestore"
import { auth } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { storage } from "../firebase.config"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { async } from "@firebase/util"

export default function Signup() {
  const [name, setName] = useState("")

  const [email, setEmail] = useState("")
  const [file, setFile] = useState(false)
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const signup = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      const storageRef = await ref(storage, `files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        error => {
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async DownloadURL => {
            //update user profile
            await updateProfile(user, {
              displayName: name,
              photoURL: DownloadURL
            })

            //store user data in firebase
            await setDoc(doc(db, "users", user.uid), {
              uid: user.id,
              displayName: name,
              email,
              photoURL: DownloadURL
            })
          })
        }
      )
      setLoading(false)
      toast.success("account created")
      navigate("/login")
    } catch (error) {
      setLoading(false)
      const errorCode = error.code
      const errorMessage = error.message
    }
  }

  return (
    <Helmet title="login">
      <CommonSection title="Register" />
      <section className="contact-us">
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading........</h5>
              </Col>
            ) : (
              <Col lg="12">
                <div className="row" id="we">
                  <div className="col-lg-8">
                    <Form onSubmit={signup} className="mt-4 mb-4 mb-lg-0">
                      <div className="form-row">
                        <FormGroup className="col-md-6 form-group">
                          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Your first name" />
                        </FormGroup>
                      </div>

                      <div className="form-row">
                        <FormGroup className="col-md-6 form-group">
                          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email adress" />
                        </FormGroup>
                      </div>
                      <div className="form-row">
                        <FormGroup className="col-md-6 form-group">
                          <input type="file" accept="image/*" onChange={handleChange} className="form-control" placeholder="Chose your profile" />
                        </FormGroup>
                      </div>
                      <div className="form-row">
                        <FormGroup className="col-md-6 form-group">
                          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" />
                        </FormGroup>
                      </div>

                      <button type="submit" className="btn btn-light ">
                        Create Account
                      </button>
                      <p>
                        already have account <Link to="/login">Login</Link>
                      </p>
                    </Form>
                  </div>

                  <div className="mapouter mt-4">
                    <div className="gmap_canvas">
                      <iframe width="492" height="396" id="gmap_canvas" src="https://maps.google.com/maps?q=france,paris&t=k&z=7&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

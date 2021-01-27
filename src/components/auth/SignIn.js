import React, { useEffect, useState } from "react"
import { Button, Alert, Form } from "react-bootstrap"
import { postCredentials } from "../../actions/AuthActions"
import { useDispatch, useSelector } from "react-redux"

function SignIn({ setCached }) {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const [creds, setCreds] = useState({
    username: "",
    password: "",
  })
  useEffect(() => {
    const cachedCreds = JSON.parse(window.localStorage.getItem("credentials"))

    // window.location.href = 'http://localhost:000/';
    if (
      cachedCreds == null &&
      window.location.href !==
        window.location.protocol +
          "//" +
          window.location.hostname +
          ":" +
          window.location.port +
          "/"
    ) {
      window.location.href =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/"
    }
    console.log(window.location.href)
    document.getElementById("login-error").style.visibility = "hidden"
  }, [])

  useEffect(() => {
    const cachedCreds = JSON.parse(window.localStorage.getItem("credentials"))
    setCached(cachedCreds)
  }, [auth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(postCredentials(creds))
    console.log(res)
    // if (res==200) {
    //     window.location.reload();
    // }
    // console.log(res)/\
    if (res === "400") {
      document.getElementById("login-error").textContent =
        "Incorrect Username or Password"
      document.getElementById("login-error").style.visibility = "visible"
    } else {
      document.getElementById("login-error").textContent = "Unknown error"
      document.getElementById("login-error").style.visibility = "visible"
    }
  }
  const handleChange = (e) => {
    document.getElementById("login-error").style.visibility = "hidden"
    setCreds(
      {
        ...creds,
        [e.target.id]: e.target.value,
      },
      console.log(creds)
    )
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <h4 style={{ textAlign: "center" }} className="form-title">
          GOLDEN ZONE GARMENTS AND ACCESSORIES, INC
        </h4>
        <br />
        <br />
        <h1 className="form-title" style={{ textAlign: "center" }}>
          Login
        </h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Username"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your Username with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Login
          </Button>
          <br />
          <Alert
            variant="danger"
            id="login-error"
            style={{ textAlign: "center" }}
          >
            Incorrect Username or Password
          </Alert>
        </Form>
      </div>
    </div>
  )
}

export default SignIn

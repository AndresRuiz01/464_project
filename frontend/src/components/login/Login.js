import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let userInfo = await props.validateUserLogin(email, password);
    if (userInfo.hasOwnProperty("UserID")) {
      console.log(userInfo)
      props.setLoggedInUserInfo(userInfo)
      navigate(`/portfolios`);
    } else {
      setInvalidPassword(true)
    }
  }

  return (
    <div className="Login">
      <h1 id="login-heading">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {invalidPassword && <div style={{color: "red"}}>Incorrect Email or Password</div>}
        <div style={{height: "10px"}}></div>
        <div id="submit-line">
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
          <NavLink id="register" to={'/register'}>Register</NavLink>
        </div>
      </Form>
    </div>
  );
}
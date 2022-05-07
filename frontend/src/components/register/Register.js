import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { NavLink } from "react-router-dom";

export default function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0 && occupation.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await props.registerUser(firstName, lastName, occupation, email, password);
    window.location.href = "/"
  }

  return (
    <div className="Login">
      <h1 id="login-heading">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="occupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            autoFocus
            type="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </Form.Group>
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
        <div style={{height: "10px"}}></div>
        <div id="submit-line">
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Register
          </Button>
          <NavLink id="register" to={'/'}>Login</NavLink>
        </div>
      </Form>
    </div>
  );
}
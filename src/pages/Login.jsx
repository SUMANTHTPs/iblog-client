import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (ev) => {
    ev.preventDefault();
    const response = await fetch(
      "https://blog-api-fawn-nu.vercel.app/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const setCookie = (name, value, daysToExpire) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      const cookieValue =
        encodeURIComponent(name) +
        "=" +
        encodeURIComponent(value) +
        ";expires=" +
        expirationDate.toUTCString() +
        ";path=/";
      document.cookie = cookieValue;
    };
    if (response.ok) {
      const data = await response.json();
      console.log(`Cookie ` + response.cookie);
      console.log("Token:", response.authToken);

      setCookie("authToken", response.authhToken, 7);
      navigate("/");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div>
      <img
        className="login-brand"
        src={logo}
        alt="brand-logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <form className="login-form" onSubmit={login}>
        <h2 className="login-txt">Login</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter the Email"
          autoFocus
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter the password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <div className="footer">
          <button className="login-btn">Login</button>
          <Link to="/signup">Register &#187;</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const url = "http://localhost:4000/api/auth";
  const [isLogin, setIsLogin] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const nav = useNavigate();

  const signUpRef = useRef(null);
  const loginRef = useRef(null);

  const extractFormData = (form, fields) => {
    const data = {};
    fields.forEach(field => {
      data[field] = form[field].value;
    });
    return data;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignupMessage('');
    const form = signUpRef.current;
    const data = extractFormData(form, ['name', 'email', 'password', 'address']);

    try {
      const res = await axios.post(`${url}/signup_submit`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSignupMessage(res.data.message);
    } catch (error) {
      const msg = error.response?.data?.message ;
      setSignupMessage(msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage('');
    const form = loginRef.current;
    const data = extractFormData(form, ['email', 'password']);

    try {
      const res = await axios.post(`${url}/login_submit`, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      setLoginMessage(res.data.message);
      if (res.data.message === "LoggedIn") nav("/home");
    } catch (error) {
      const msg = error.response?.data?.message;
      setLoginMessage(msg);
    }
  };

  const toggleForm = (mode) => {
    setIsLogin(mode === "login");
    setLoginMessage('');
    setSignupMessage('');
  };

  return (
    <div className={`auth-container ${isLogin ? 'login-mode' : 'signup-mode'}`}>

      <div className="form-box login">
        <form ref={loginRef} onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button className="glow-button" type="submit">Login</button>
          <div className="auth-message">{loginMessage}</div>
          <p>
            Don’t have an account?{' '}
            <span className="switch-link" onClick={() => toggleForm("signup")}>Sign Up</span>
          </p>
        </form>
      </div>

      <div className="form-box signup">
        <form ref={signUpRef} onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <textarea name="address" placeholder="Address" required></textarea>
          <button className="glow-button" type="submit">Sign Up</button>
          <div className="auth-message">{signupMessage}</div>
          <p>
            Already have an account?{' '}
            <span className="switch-link" onClick={() => toggleForm("login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;

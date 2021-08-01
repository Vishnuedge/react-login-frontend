import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function Signup({ history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          firstName,
          lastName,
          email,
          password
        },
        config
      );

      localStorage.setItem('authToken', data.token);
      history.push('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <>
      <div>
        <div className="container outer__body ">
          <div className="form__outer">
            <div className="row">
              <div className="col-lg-3 col-md-2 " />
              <div className="col-lg-6  col-md-8">
                {/* FORM */}
                <form className="form" onSubmit={handleSubmit}>
                  {/* FORM TITLE */}
                  <h3>Create an account</h3>
                  {error && <span>{error}</span>}
                  {/* FORM SUB-TITLE */}
                  <h6 className="text-muted">
                    Your account will allow you to partner with us
                  </h6>
                  {/* EMAIL ADDRESS */}
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label ">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />

                    <div id="emailHelp" class="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  {/* NAME */}
                  <div className="name__flex">
                    <div class="row align-items-center">
                      <label for="inputPassword6" class="col-form-label">
                        First Name
                      </label>
                      <div class="col-auto ">
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="row  align-items-center">
                      <label for="inputPassword6" class="col-form-label">
                        Last Name
                      </label>
                      <div class="col-auto">
                        <input
                          type="text"
                          class="form-control"
                          name="lastName"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* PASSWORD */}
                  <div class="mb-3 mt-3">
                    <label for="inputPassword5" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="inputPassword5"
                      class="form-control"
                      aria-describedby="passwordHelpBlock"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />

                    <div id="passwordHelpBlock" class="form-text">
                      Your password must be 8-20 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </div>
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div class="mb-3 mt-3">
                    <label for="inputPassword5" class="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="inputPassword5"
                      class="form-control"
                      aria-describedby="passwordHelpBlock"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {/* TERMS AND CONDITION */}
                  <h6 className="text-muted mb-4">
                    By proceeding, you agree to the{' '}
                    <Link to="#">Terms and Conditions</Link>
                  </h6>
                  {/* BUTTON */}
                  <div>
                    <button type="submit" class="btn btn-secondary p-3">
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <h6 className="mt-3 mb-3">
                    Already have an account? <Link to="login">Log in</Link>
                  </h6>
                </form>
              </div>
              <div className="col-lg-3 col-md-2 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

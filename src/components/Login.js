import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
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
                  <h3 className="mb-3">Log in </h3>
                  {error && <span>{error}</span>}
                  <h6 className="text-muted mb-3">Continue with us </h6>
                  {/*EMAIL*/}
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="loginEmail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  {/* PASSWORD */}
                  <div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="loginPassword"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* LOGIN BUTTON */}

                  <div className="text-center">
                    <button type="submit" class="btn btn-secondary p-2">
                      LOGIN
                    </button>
                  </div>
                  <h6 className="mt-3 mb-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
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

import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const validate = values => {
    var errors = {};
    if (!values.loginEmail) {
      errors.loginEmail = '*Required Email*';
    } else if (!values.loginPassword) {
      errors.loginPassword = '*Required Password*';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: ''
    },
    validate,
    onSubmit: async (userInputs, { setSubmitting, resetForm }) => {
      const newLogin = {
        loginEmail: userInputs.loginEmail,
        loginPassword: userInputs.loginPassword
      };
      const data = await axios.post(
        'http://localhost:3003/auth/logindata',
        newLogin
      );
      console.log(data.data);

      resetForm();
    }
  });

  return (
    <>
      <div>
        <div className="container outer__body ">
          <div className="form__outer">
            <div className="row">
              <div className="col-lg-3 col-md-2 " />
              <div className="col-lg-6  col-md-8">
                {/* FORM */}
                <form className="form" onSubmit={formik.handleSubmit}>
                  {/* FORM TITLE */}
                  <h3 className="mb-3">Log in </h3>
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
                      value={formik.values.loginEmail}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.loginEmail ? (
                      <p className="text-danger">{formik.errors.loginEmail}</p>
                    ) : (
                      <div />
                    )}
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
                        value={formik.values.loginPassword}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.loginPassword ? (
                        <p className="text-danger">
                          {formik.errors.loginPassword}
                        </p>
                      ) : (
                        <div />
                      )}
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

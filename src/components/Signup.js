import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

export default function Signup() {
  //FORMIK ERRORS

  const validate = values => {
    var errors = {};
    if (!values.candidateEmail) {
      errors.candidateEmail = '*Required Email*';
    } else if (!values.candidateFirstName) {
      errors.candidateFirstName = '*Required First Name*';
    } else if (!values.candidateSecondName) {
      errors.candidateSecondName = '*Required Second Name*';
    } else if (!values.candidateEmail) {
      errors.candidateEmail = '*Required Email*';
    } else if (!values.candidatePassword) {
      errors.candidatePassword = '*Required Password*';
    } else if (!values.candidateConfirmPassword) {
      errors.candidateConfirmPassword = '*Required Password*';
    } else if (values.candidatePassword != values.candidateConfirmPassword) {
      errors.candidateConfirmPassword = `*Password Dont Match*`;
    }

    return errors;
  };

  //FORMIK

  const formik = useFormik({
    initialValues: {
      candidateFirstName: '',
      candidateSecondName: '',
      candidateEmail: '',
      candidatePassword: '',
      candidateConfirmPassword: ''
    },
    validate,
    onSubmit: (userInputs, { setSubmitting, resetForm }) => {
      const newUser = {
        candidateFirstName: userInputs.candidateFirstName,
        candidateSecondName: userInputs.candidateSecondName,
        candidateEmail: userInputs.candidateEmail,
        candidatePassword: userInputs.candidateConfirmPassword
      };
      axios.post('http://localhost:3001/signdata', newUser);
      console.log(userInputs);
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
                  <h3>Create an account</h3>
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
                      name="candidateEmail"
                      value={formik.values.candidateEmail}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.candidateEmail ? (
                      <p className="text-danger">
                        {formik.errors.candidateEmail}
                      </p>
                    ) : (
                      <div />
                    )}
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
                          name="candidateFirstName"
                          value={formik.values.candidateFirstName}
                          onChange={formik.handleChange}
                        />
                        <div>
                          {formik.errors.candidateFirstName ? (
                            <p className="text-danger">
                              {formik.errors.candidateFirstName}
                            </p>
                          ) : (
                            <div />
                          )}
                        </div>
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
                          name="candidateSecondName"
                          value={formik.values.candidateSecondName}
                          onChange={formik.handleChange}
                        />
                        <div>
                          {formik.errors.candidateSecondName ? (
                            <p className="text-danger">
                              {formik.errors.candidateSecondName}
                            </p>
                          ) : (
                            <div />
                          )}
                        </div>
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
                      name="candidatePassword"
                      value={formik.values.candidatePassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.candidatePassword ? (
                      <p className="text-danger">
                        {formik.errors.candidatePassword}
                      </p>
                    ) : (
                      <div />
                    )}
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
                      name="candidateConfirmPassword"
                      value={formik.values.candidateConfirmPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.candidateConfirmPassword ? (
                      <p className="text-danger">
                        {formik.errors.candidateConfirmPassword}
                      </p>
                    ) : (
                      <div />
                    )}
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

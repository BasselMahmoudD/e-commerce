import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,}$/, "Password InValid")
        .required(),
    });
    return schema;
  }

  // Custom Validation

  // function validate(values) {
  //   let msgErr = {};
  //   if (!values.name) {
  //     msgErr.name = "Name is Required";
  //   }
  //   if (!values.email) {
  //     msgErr.email = "email is Required";
  //   }
  //   if (!/^[A-Z][A-za-z0-9@]{6,}$/.test(values.password)) {
  //     msgErr.password = "password InValid";
  //   }
  //   if (values.rePassword != values.password && values.rePassword != null) {
  //     msgErr.rePassword = "Password DoesNot Match";
  //   }
  //   return msgErr;
  // }

  let Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          navigate("/home");
        })
        .catch((err) => {
          setErrorMsg(err?.response.data.message);
          setLoading(true);
        });
    },
  });
  // console.log(Login.errors);
  return (
    <>
      <div className="w-75 m-auto loginPage">
        <h2>Login Now :</h2>
        <form onSubmit={Login.handleSubmit}>
          <label htmlFor="name" className="my-1 mt-3">
            Email :
          </label>
          <input
            id="email"
            onBlur={Login.handleBlur}
            name="email"
            type="email"
            className="form-control"
            onChange={Login.handleChange}
            value={Login.values.email}
          />

          {Login.errors.email && Login.touched.email ? (
            <div className="alert alert-danger my-2 p-4">
              {Login.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password" className="my-1 mt-3">
            Password :
          </label>
          <input
            id="password"
            onBlur={Login.handleBlur}
            name="password"
            type="password"
            className="form-control"
            onChange={Login.handleChange}
            value={Login.values.password}
          />

          {Login.errors.password && Login.touched.password ? (
            <div className="alert alert-danger my-2 p-4">
              {Login.errors.password}
            </div>
          ) : (
            ""
          )}

          {errorMsg ? (
            <div className="alert alert-danger my-2 p-4">{errorMsg}</div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between align-items-center">
            <NavLink className="text-main fw-bold fs-5" to="/forgetPassword">
              forget your password ?
            </NavLink>
            <button
              disabled={!(Login.dirty && Login.isValid)}
              type="submit"
              className="btn submitBtn my-4 "
            >
              {loading ? "signin" : <i className="fa  fa-spinner fa-spin"></i>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

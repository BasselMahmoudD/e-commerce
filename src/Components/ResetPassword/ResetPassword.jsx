import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      email: yup.string().email().required(),
      newPassword: yup
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

  let verifyPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        )
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
        <h2 className="fw-bold py-3">Reset your account password :</h2>
        <form onSubmit={verifyPass.handleSubmit}>
          <label htmlFor="name" className="my-1 mt-3">
            Email :
          </label>
          <input
            id="email"
            onBlur={verifyPass.handleBlur}
            name="email"
            type="email"
            className="form-control"
            onChange={verifyPass.handleChange}
            value={verifyPass.values.email}
          />

          {verifyPass.errors.email && verifyPass.touched.email ? (
            <div className="alert alert-danger my-2 p-4">
              {verifyPass.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="newPassword" className="my-1 mt-3">
            Password :
          </label>
          <input
            id="newPassword"
            onBlur={verifyPass.handleBlur}
            name="newPassword"
            type="password"
            className="form-control"
            onChange={verifyPass.handleChange}
            value={verifyPass.values.newPassword}
          />

          {verifyPass.errors.newPassword && verifyPass.touched.newPassword ? (
            <div className="alert alert-danger my-2 p-4">
              {verifyPass.errors.newPassword}
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
            <button
              disabled={!(verifyPass.dirty && verifyPass.isValid)}
              type="submit"
              className="btn submitBtn my-4 "
            >
              {loading ? (
                "Reset Password"
              ) : (
                <i className="fa  fa-spinner fa-spin"></i>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

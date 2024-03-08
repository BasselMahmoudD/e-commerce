import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Await, NavLink, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      email: yup.string().email().required(),
    });
    return schema;
  }

  async function getAllUsers(email) {
    let users = await axios.get("https://ecommerce.routemisr.com/api/v1/users");
    if (users.status == 200) {
      for (let i = 0; i <= users.data.users.length; i++) {
        if (users.data.users[i]?.email.includes(email)) {
          console.log("exist");
          return true;
        } else {
          console.log("not");
        }
      }
    }
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

  let verify = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        )
        .then(async function ({ data }) {
          let res = await getAllUsers(values.email);
          if (res) {
            setLoading(true);
            navigate("/verifyCode");
          } else {
            setLoading(true);
            setErrorMsg(err?.response.data.message);
            return false;
          }
        })
        .catch((err) => {
          setLoading(true);
          setErrorMsg(err?.response?.data?.message);
        });
    },
  });

  return (
    <>
      <div className="w-75 m-auto loginPage">
        <h2 className="text-start py-4 fw-bold">
          please enter your verification code:
        </h2>
        <form onSubmit={verify.handleSubmit}>
          <input
            id="email"
            onBlur={verify.handleBlur}
            name="email"
            type="email"
            placeholder="Enter Your Email ..."
            className="form-control p-3"
            onChange={verify.handleChange}
            value={verify.values.email}
          />

          {verify.errors.email && verify.touched.email ? (
            <div className="alert alert-danger my-2 p-4">
              {verify.errors.email}
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
              disabled={!(verify.dirty && verify.isValid)}
              type="submit"
              className="btn submitBtn my-4 "
            >
              {loading ? "Verify" : <i className="fa  fa-spinner fa-spin"></i>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

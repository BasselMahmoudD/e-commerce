import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      resetCode: yup.string().required(),
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

  let verify = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        )
        .then(({ data }) => {
          setLoading(true);
          navigate("/resetPassword");
        })
        .catch((err) => {
          setErrorMsg(err?.response.data.message);
          setLoading(true);
        });
    },
  });

  return (
    <>
      <div className="w-75 m-auto loginPage">
        <h2 className="text-start py-4 fw-bold">
          reset your account password :
        </h2>
        <form onSubmit={verify.handleSubmit}>
          <input
            id="resetCode"
            onBlur={verify.handleBlur}
            name="resetCode"
            type="code"
            placeholder="Enter Your code ..."
            className="form-control p-3"
            onChange={verify.handleChange}
            value={verify.values.resetCode}
          />

          {verify.errors.resetCode && verify.touched.resetCode ? (
            <div className="alert alert-danger my-2 p-4">
              {verify.errors.resetCode}
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
            <button type="submit" className="btn submitBtn my-4 ">
              {loading ? "Verify" : <i className="fa  fa-spinner fa-spin"></i>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

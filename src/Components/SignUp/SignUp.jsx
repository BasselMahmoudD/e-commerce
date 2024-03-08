import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      name: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,}$/, "Password InValid")
        .required(),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password")])
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

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
        .then(({ data }) => {
          console.log(data);
          navigate("/signIn");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setLoading(true);
        });
    },
  });
  // console.log(register.errors);
  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Register Now :</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name" className="my-1 mt-3">
            Name :
          </label>
          <input
            id="name"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="name"
            type="text"
            className="form-control"
            value={register.values.name}
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger my-2 p-4">
              {register.errors.name}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="name" className="my-1 mt-3">
            Email :
          </label>
          <input
            id="email"
            onBlur={register.handleBlur}
            name="email"
            type="email"
            className="form-control"
            onChange={register.handleChange}
            value={register.values.email}
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger my-2 p-4">
              {register.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password" className="my-1 mt-3">
            Password :
          </label>
          <input
            id="password"
            onBlur={register.handleBlur}
            name="password"
            type="password"
            className="form-control"
            onChange={register.handleChange}
            value={register.values.password}
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger my-2 p-4">
              {register.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword" className="my-1 mt-3">
            RePassword :
          </label>
          <input
            onBlur={register.handleBlur}
            id="rePassword"
            name="rePassword"
            type="password"
            className="form-control"
            onChange={register.handleChange}
            value={register.values.rePassword}
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger my-2 p-4">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div className="alert alert-danger my-2 p-4">{errorMsg}</div>
          ) : (
            ""
          )}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn submitBtn my-4 "
          >
            {loading ? "signUp" : <i className="fa  fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}

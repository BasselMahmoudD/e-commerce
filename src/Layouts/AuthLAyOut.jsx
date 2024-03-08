import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";

export default function AuthLAyOut() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link position-relative mx-4"
                  aria-current="page"
                  to="/signIn"
                >
                  SignIn
                  <i className="fa-solid fa-right-from-bracket iconLogo mx-2"></i>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link position-relative mx-4"
                  aria-current="page"
                  to="/signUp"
                >
                  SignUp
                  <i className="fa-solid fa-right-from-bracket iconLogo mx-2"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

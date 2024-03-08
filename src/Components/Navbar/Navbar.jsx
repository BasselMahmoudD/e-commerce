import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { storeContext } from "../../context/StoreContextProvider";
import Wishlist from "./../Wishlist/Wishlist";
export default function Navbar() {
  let { counter, getCart, setCounter } = useContext(storeContext);

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      if (data?.status == "success") {
        setCounter(data.numOfCartItems);
      }
    })();
  }, []);
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/wishlist"
                >
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link  position-relative"
                  aria-current="page"
                  to="/cart"
                >
                  Cart
                  <i className="fa-solid fa-cart-shopping iconLogo mx-2"></i>
                  {!counter ? (
                    ""
                  ) : (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link  position-relative mx-4"
                  aria-current="page"
                  to="/signIn"
                >
                  LogOut
                  <i className="fa-solid fa-right-from-bracket iconLogo mx-2"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

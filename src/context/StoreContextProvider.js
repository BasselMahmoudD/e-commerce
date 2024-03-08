import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

export let storeContext = createContext(0);

export default function StoreContextProvider({ children }) {
  let [counter, setCounter] = useState(0);

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  function addToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function getWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function deleteWishlistItem(productId) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }


  function updateQTY(productId, count) {
    return axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        { count },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  function pay(cartId, shippingAddress) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  function getSubCategories(id) {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/categories/" +
          id +
          "/subcategories"
      )
      .then((data) => data)
      .catch((err) => err);
  }

  return (
    <storeContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        deleteCartItem,
        updateQTY,
        pay,
        getSubCategories,
        clearCart,
        getWishlist,
        deleteWishlistItem,
        addToWishlist
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

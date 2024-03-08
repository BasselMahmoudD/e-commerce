import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

export default function Product({ item }) {
  let { setCounter, addToCart, addToWishlist, getWishlist } =
    useContext(storeContext);
  let [loading, setLoading] = useState(true);
  let [loadingWishlist, setLoadingWishlist] = useState(true);
  let [favPro, setFavPro] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  let [iconColor, setIconColor] = useState("white");
  // const [iconColor, setIconColor] = useState(() => {
  //   // Check local storage for saved color, default to black if not found
  //   return localStorage.getItem("wishlistIconColor") || "black";
  // });

  function getAllId(item) {
    return item.id;
  }

  async function getItems() {
    setLoading(false);
    let { data } = await getWishlist();
    if (data?.status == "success") {
      setWishlistItems(data.data);
      setLoading(true);
      setFavPro(data?.data?.map(getAllId));
    }
  }

  async function addProductToCart(productId) {
    setLoading(false);
    let { data } = await addToCart(productId);
    if (data?.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setLoading(true);
    }
  }
  async function addProductToWishlist(productId) {
    setLoadingWishlist(false);
    setIconColor("red");
    let { data } = await addToWishlist(productId);
    if (data?.status == "success") {
      toast.success("Product added successfully to Wishlist");
      setLoadingWishlist(true);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="col-md-2 product my-2  rounded-3 p-3 cursor-pointer">
        <Link to={"/productDetails/" + item._id}>
          <img src={item.imageCover} className="w-100" />
          <span className="text-main">{item.category.name}</span>
          <h5 className=" my-2 fw-bold">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="d-flex justify-content-between">
            <div>{item.price} EGP</div>
            <div>
              <i className="fa-solid fa-star rating-color font-sm"></i>
              {item.ratingsQuantity}
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-between">
          <button
            disabled={!loading}
            onClick={() => addProductToCart(item._id)}
            className=" btn bg-main w-100 text-light my-2"
          >
            {loading ? "Add To Cart" : <span className="loader"></span>}
          </button>
          <button
            disabled={!loadingWishlist}
            onClick={() => addProductToWishlist(item._id)}
            className="btn bg-main p-0 mx-1 w-100 my-2"
          >
            {favPro.includes(item._id) ? (
              <i
                className="fa-solid bg-main rounded-2 p-2 heart fa-heart"
                style={{ color: "red" }}
              ></i>
            ) : (
              <i
                className="fa-solid bg-main rounded-2 p-2 heart fa-heart"
                style={{ color: iconColor }}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

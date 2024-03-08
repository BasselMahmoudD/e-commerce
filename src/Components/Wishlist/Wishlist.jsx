import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
// import Wishlist from "./Wishlist";

export default function Wishlist() {
  let { getWishlist, deleteWishlistItem, setCounter, addToCart } =
    useContext(storeContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [btnLoading, setBtnLoading] = useState(true);
  let [loading, setLoading] = useState(true);

  async function getItems() {
    setLoading(false);
    let { data } = await getWishlist();
    if (data?.status == "success") {
      setWishlistItems(data.data);
      setLoading(true);
    }
  }

  async function deleteProduct(id) {
    let { data } = await deleteWishlistItem(id);
    if (data?.status == "success") {
      toast.error("Product Deleted Successfully");
      getItems();
    }
  }

  async function addProductToCart(productId) {
    setBtnLoading(false);
    let { data } = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
      deleteProduct(productId)
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  // if (!loading) return <Loading />;

  return (
    <>
      <div className="container bg-main-light mt-3  p-5">
        {wishlistItems.length >= 1 ? (
          <div className="content">
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fw-bold text-main">My wishList : </h2>
              </div>
            </div>
            {wishlistItems?.map((item) => {
              return (
                <div key={item.id} className="row border-bottom py-2">
                  <div className="col-md-2">
                    <img className="w-100" src={item.imageCover} />
                  </div>
                  <div className="col-md-10 p-2 mt-5 d-flex justify-content-between">
                    <div>
                      <h5 className="fw-bold">
                        {item?.title?.split(" ").slice(0, 10).join(" ")}
                      </h5>
                      <p className="text-main fw-bold">Price : {item.price}</p>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="border-0 bg-danger text-light m-0 p-2 rounded-2"
                      >
                        <i className="fa-regular  fa-trash-can text-light "></i>{" "}
                        Remove
                      </button>
                    </div>
                    <div className="me-3 mt-3 ">
                      <button
                        onClick={() => addProductToCart(item._id)}
                        className=" brdr btn fw-bold bg-main text-light"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="text-main text-center my-3 p-2 fw-bold">
            Wishlist is Empty
          </h1>
        )}
      </div>
    </>
  );
}

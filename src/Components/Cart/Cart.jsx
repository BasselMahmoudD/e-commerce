import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Cart() {
  let { getCart, setCounter, deleteCartItem, updateQTY, clearCart } =
    useContext(storeContext);
  const [cartItems, setCartItems] = useState([]);
  let [loading, setLoading] = useState(true);

  async function deleteProduct(id) {
    let { data } = await deleteCartItem(id);
    if (data?.status == "success") {
      console.log("hello");
      toast.error("Product Deleted Successfully");
      setCounter(data.numOfCartItems);
      setCartItems(data.data);
    }
  }

  async function clearItemsInCart() {
    let { data } = await clearCart();
    console.log(data);
    if (data?.message == "success") {
      toast.error("Cart Deleted");
      setCounter(data.numOfCartItems);
      setCartItems(data.data);
    }
  }

  async function updateCount(id, count) {
    let { data } = await updateQTY(id, count);
    if (data.status == "success") {
      setCounter(data.numOfCartItems);
      setCartItems(data.data);
    }
  }

  async function getItems() {
    setLoading(false);
    let { data } = await getCart();
    console.log(data?.data);
    if (data?.status == "success") {
      console.log("hi");
      setCartItems(data.data);
      setLoading(true);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  // if (!loading) return <Loading />;
  return (
    <>
      <div className="container bg-main-light mt-3  p-5">
        {!cartItems?.products?.length == 0 ? (
          <div className="content">
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fw-bold">Shop Cart : </h2>
                <p className="text-main fw-bold">
                  Total Cart Price : {cartItems?.totalCartPrice} EGp
                </p>
              </div>
              <div>
                <button
                  className="btn btn-primary fw-bold px-4 py-2"
                  onClick={clearItemsInCart}
                >
                  Clear Your Cart
                </button>
              </div>
            </div>
            {cartItems?.products?.map((item) => {
              return (
                <div key={item._id} className="row border-bottom py-2">
                  <div className="col-md-2">
                    <img className="w-100" src={item.product.imageCover} />
                  </div>
                  <div className="col-md-10 p-2 mt-5 d-flex justify-content-between">
                    <div>
                      <h5 className="fw-bold">
                        {item.product.title.split(" ").slice(0, 10).join(" ")}
                      </h5>
                      <p className="text-main fw-bold">Price : {item.price}</p>
                      <button
                        onClick={() => deleteProduct(item.product._id)}
                        className="border-0 m-0 p-0"
                      >
                        <i className="fa-regular fa-trash-can text-main "></i>{" "}
                        Remove
                      </button>
                    </div>
                    <div className="me-3 mt-3">
                      <button
                        onClick={() =>
                          updateCount(item.product._id, item.count + 1)
                        }
                        className=" brdr btn"
                      >
                        +
                      </button>
                      <span>{item.count}</span>
                      <button
                        disabled={item.count <= 1}
                        onClick={() =>
                          updateCount(item.product._id, item.count - 1)
                        }
                        className=" brdr btn"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              to={`/address/${cartItems?._id}`}
              className="btn bg-main text-light my-4 fw-bold"
            >
              Place Order
            </Link>
          </div>
        ) : (
          <h1 className="text-main text-center my-3 p-2 fw-bold">
            Cart Is Empty
          </h1>
        )}
      </div>
    </>
  );
}

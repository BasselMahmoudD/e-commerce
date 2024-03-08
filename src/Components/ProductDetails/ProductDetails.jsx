import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(true);
  let { setCounter, addToCart } = useContext(storeContext);

  let id = useParams();
  async function getSingleProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id.id}`
    );
    setProduct(data?.data);
    setLoading(false);
  }

  async function addProductToCart(productId) {
    setBtnLoading(false);
    let { data } = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 my-5">
            <img className="w-100" src={product?.imageCover} />
          </div>
          <div className="col-md-9 my-5 p-5">
            <h3 className="my-4 fw-bold">{product?.title}</h3>
            <p className="font-sm color-sm p-2">{product?.description}</p>
            <span className="fw-bold">{product?.category.name}</span>
            <div className="d-flex justify-content-between">
              <div className="fw-bold my-2">{product?.price} EGP</div>
              <div className="fw-bold">
                <i className="fa-solid fa-star rating-color font-sm"></i>
                {product?.ratingsQuantity}
              </div>
            </div>
            <button
              onClick={() => addProductToCart(product._id)}
              className="w-100 bg-main text-light btn"
            >
              {btnLoading ? "Add To Cart" : <span class="loader"></span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

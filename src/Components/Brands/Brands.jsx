import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [specificBrand, setSpecificBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isLoading } = useQuery("getAllBrands", getAllBrands);

  async function getSpecificBrand(id) {
    setLoading(false);
    let data = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    if (data.status == 200) {
      setSpecificBrand(data.data.data);
      setLoading(true);
    }
  }

  // let { specificBrand } = useQuery("getSpecificBrand", getSpecificBrand);

  useEffect(() => {
    getAllBrands();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 className="text-main text-center mt-4 fw-bolder m-5">All Brands</h1>
      <div className="container">
        <div className="row">
          {data?.data?.data.map((item) => {
            return (
              <div key={item._id} className="col-md-3 g-3">
                <div
                  type="button"
                  className="btn card"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    getSpecificBrand(item._id);
                  }}
                >
                  <img
                    src={item.image}
                    className="card-img-top "
                    height={200}
                    width={50}
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text text-center card-info fw-bold">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fw-bold text-center w-100"
                  id="exampleModalLabel"
                >
                  {loading ? specificBrand.name : ""}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              {loading ? (
                <div className="modal-body d-flex justify-content-between">
                  <div className="label ">
                    <h2 className="text-main fw-bold mt-4">
                      {specificBrand.name}
                    </h2>
                    <p>{specificBrand.slug}</p>
                  </div>
                  <div className="imageLabel">
                    <img src={specificBrand.image} className="w-50" />
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-around">
                  <span className="loading my-4"></span>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

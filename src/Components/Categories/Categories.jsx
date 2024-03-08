import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { storeContext } from "../../context/StoreContextProvider";

export default function Categories() {
  let { getSubCategories } = useContext(storeContext);
  const [sub, setSub] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  async function getSpecificCategory(id, CategoryName) {
    let data = await getSubCategories(id);
    console.log(data.data.data);
    if (data.statusText == "OK") {
      setSub(data.data.data);
      setCategoryName(CategoryName);
    }
  }

  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("getCategories", getCategories);

  useEffect(() => {
    getCategories();
    console.log(sub);
  }, [sub]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="row">
          {data?.data?.data.map((item) => {
            return (
              <div key={item._id} className="col-md-4 g-3">
                <div
                  className="card"
                  onClick={() => getSpecificCategory(item._id, item.name)}
                >
                  <img
                    src={item.image}
                    className="card-img-top"
                    height={350}
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
        {sub.length >= 1 ? (
          <div className="my-3">
            <h3 className="title fw-bolder text-center text-main">
              {categoryName + " SubCategories"}
            </h3>
            <div className="row">
              {sub.map((item) => {
                return (
                  <div className="col-md-4" key={item._id}>
                    <div className="subCategory">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

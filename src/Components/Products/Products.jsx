import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";

export default function Products() {
  const [newData, setNewData] = useState([]);
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function getProducts() {
    setLoading(false);
    let data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    if (data.status == 200) {
      setNewData(data?.data?.data);
      setLoading(true);
    }
  }

  // function searchInput(value) {
  //   setSearch(value);
  //   console.log(newData);
  //   console.log(search);
  //   for (let i = 0; i <= newData?.length; i++) {
  //     if (newData[i]?.slug?.toLowerCase().includes(search.toLowerCase())) {
  //       setFilteredData(newData[i]);
  //     }
  //   }
  //   console.log(filteredData);
  //   // setNewData(filteredData);
  //   // const filteredData = newData.filter((item) =>
  //   //   item.slug.toLowerCase().includes(search.toLowerCase())
  //   // );
  //   // console.log(filteredData);
  //   // setNewData(filteredData);
  // }

  useEffect(() => {
    getProducts();
  }, []);

  if (!loading) return <Loading />;

  return (
    <div className="container">
      <input
        onKeyUp={(e) => setSearch(e.target.value)}
        className="my-5 w-75 mx-auto form-control"
        type="text"
        placeholder="Search..."
        height="70"
      />
      <div className="row">
        {newData
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map((item) => {
            return <Product item={item} key={item.id} />;
          })}
      </div>
    </div>
  );
}

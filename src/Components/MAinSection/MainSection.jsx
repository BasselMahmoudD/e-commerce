import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import photo1 from "../../assets/images/2e299e90-97ef-443d-ab49-d880e19044bf.avif";
import photo2 from "../../assets/images/30033578-2c2c-4dba-8d4f-fe0d1f9642d9.avif";
import photo3 from "../../assets/images/a4f4b458-c1f1-424c-aa1f-fd5bd2a8d41f.avif";
import axios from "axios";
import Products from "./../Products/Products";

export default function MainSection() {
  const [items, setItems] = useState([]);

  async function getItems() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setItems(data.data);
  }

  useEffect(() => {
    getItems();
  }, []);

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>
      <Slider {...settings1} className="slider w-100">
        <img className="text-center" src={photo1}></img>
        <img className="text-center" src={photo2}></img>
        <img className="text-center" src={photo3}></img>
      </Slider>
      <Slider {...settings2} className="w-100">
        {items.map((item) => (
          <img key={item._id} src={item.image} height={200} />
        ))}
      </Slider>
      <div className="my-5"></div>
      <Products />
    </>
  );
}

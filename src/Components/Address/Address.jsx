import { useFormik } from "formik";
import React, { useContext } from "react";
import { storeContext } from "../../context/StoreContextProvider";
import { useParams } from "react-router-dom";

export default function Address() {
  let { id } = useParams();
  let { pay } = useContext(storeContext);
  let placeOrder = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      let data = await pay(id, values);
      console.log(data);
      if ((data.status = "success")) {
        window.location.href = data.data.session.url;
      }
    },
  });

  return (
    <>
      <div className="w-75 m-auto placeOrderPage">
        <h2>Place Order :</h2>
        <form onSubmit={placeOrder.handleSubmit}>
          <label htmlFor="details" className="my-1 mt-3">
            Details :
          </label>
          <input
            id="details"
            onBlur={placeOrder.handleBlur}
            name="details"
            type="text"
            className="form-control"
            onChange={placeOrder.handleChange}
            value={placeOrder.values.details}
          />

          <label htmlFor="phone" className="my-1 mt-3">
            Phone :
          </label>
          <input
            id="phone"
            onBlur={placeOrder.handleBlur}
            name="phone"
            type="text"
            className="form-control"
            onChange={placeOrder.handleChange}
            value={placeOrder.values.phone}
          />
          <label htmlFor="city" className="my-1 mt-3">
            city :
          </label>
          <input
            id="city"
            onBlur={placeOrder.handleBlur}
            name="city"
            type="text"
            className="form-control"
            onChange={placeOrder.handleChange}
            value={placeOrder.values.city}
          />

          <button type="submit" className="btn submitBtn my-4 ">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}

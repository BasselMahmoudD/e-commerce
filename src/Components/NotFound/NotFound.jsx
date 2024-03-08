import React from "react";
import err from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <img src={err} />
      <h1>Page Not Found !!</h1>
    </div>
  );
}

import React from "react";
import Products from "./Products";

export default function Home() {
  return (
    <div className="hero">
      <div className="card text-bg-dark text-black border-0 mx-auto">
        <img
          src="/assets/dede.jpg"
          className="card-img"
          alt="Background"
          height="550px" 
        />
        <div className="card-img-overlay d-flex flex-column">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder mb-0">
              THE BLACKEST FRIDAY SALE
            </h5>
            <p className="card-text fs-2">
              This Friday, you will experience the BEST Friday sales compared to
              any other store. Keep an eye out for special offers too!
            </p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

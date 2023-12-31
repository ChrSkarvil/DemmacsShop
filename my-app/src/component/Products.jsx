import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { variables } from './../Variables'


export default function Products() {
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [loading, setLoading] = useState([false]);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      // const response = await fetch("https://fakestoreapi.com/products");
      const response = await fetch(variables.PRODUCT_API_URL);
      if (componentMounted) {
        setdata(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.categoryName === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>

          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Phone")}
          >
            Phones
          </button>

          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Pc")}
          >
            PC's
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Hardware")}
          >
            Hardware
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Equipment")}
          >
            Equipment
          </button>
        </div>

        <div className="test d-flex justify-content-center mb-5 pb-5">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            {filter.map((product) => {
              return (
                <div className="col mb-4" key={product.productID}>
                  <div className="card h-100 text-center p-4">
                    <div className="d-flex flex-column h-100">
                      <div className="d-flex align-items-center">
                        <img
                          src={`data:image/jpeg;base64,${product.image}`}
                          className="card-img-top"
                          alt={product.productName}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: "250px",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      </div>
                      <div className="card-body flex-grow-1">
                      </div>
                      <div className="card-footer">
                        <h5 className="card-title mb-0">
                          {product.productName.substring(0, 12)}...
                        </h5>
                        <p className="card-text lead fw-bold">
                          ${product.productPrice}
                        </p>
                        <NavLink to={`/products/${product.productID}`} className="btn btn-outline-dark">
                          Buy Now
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center"></div>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

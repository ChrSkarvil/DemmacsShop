import React, { useState, useEffect } from "react";
import Footer from "./Footer";

export default function Products() {
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [loading, setLoading] = useState([false]);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
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
    return <>Loading...</>;
  };

const filterProduct = (cat) => {
  const updatedList = data.filter((x)=>x.category === cat);
  setFilter(updatedList);
}
  
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          {/* test vv*/}
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Phones</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>PC's</button>
          {/* Test ^^ */}
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("hardware")}>Hardware</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("equipment")}>Equipment</button>
        </div>

        <div className="test d-flex justify-content-center mb-5 pb-5"> 
          {filter.map((product) => {
            return (
              <div>
                <div className="col-md-4 mb-4 p-1" key={product.id}>
                  <div className="card h-100 text-center p-4">
                    <img src={product.image} className="card-img-top mb-2" alt={product.title} height="250px" />
                    <div className="card-body">
                      <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                      <p className="card-text lead fw-bold">
                        ${product.price}
                      </p>
                      <a href="#" className="btn btn-outline-dark">
                        Buy Now
                      </a>
                    </div>
                  </div>
              </div>
            </div>
          );
        })}

        </div>

        <div className="row">
          {/* Product 1 */}
          <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                class="card-img-top"
                alt="Product 1"
              />
              <div class="card-body">
                <h5 class="card-title">dasdas</h5>
                <p class="card-text">$25.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                class="card-img-top"
                alt="Product 2"
              />
              <div class="card-body">
                <h5 class="card-title">Product 2 Name</h5>
                <p class="card-text">$30.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
                class="card-img-top"
                alt="Product 3"
              />
              <div class="card-body">
                <h5 class="card-title">Product 2 Name</h5>
                <p class="card-text">$30.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

                    {/* Product 2 */}
                    <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                class="card-img-top"
                alt="Product 2"
              />
              <div class="card-body">
                <h5 class="card-title">Product 2 Name</h5>
                <p class="card-text">$30.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

                    {/* Product 2 */}
                    <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                class="card-img-top"
                alt="Product 2"
              />
              <div class="card-body">
                <h5 class="card-title">Product 2 Name</h5>
                <p class="card-text">$30.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

                    {/* Product 2 */}
                    <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                class="card-img-top"
                alt="Product 2"
              />
              <div class="card-body">
                <h5 class="card-title">Product 2 Name</h5>
                <p class="card-text">$30.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                class="card-img-top"
                alt="Product 1"
              />
              <div class="card-body">
                <h5 class="card-title">Product 1 Name</h5>
                <p class="card-text">$25.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div class="card">
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                class="card-img-top"
                alt="Product 1"
              />
              <div class="card-body">
                <h5 class="card-title">Product 1 Name</h5>
                <p class="card-text">$25.00</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          {/* Add more products here */}
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

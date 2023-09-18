import React, { useState, useEffect } from "react";

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

  const ShowProducts = () => {
    return (
      <>


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
                <h5 class="card-title">Product 1 Name</h5>
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
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center"></div>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

// {filter.map((product) => {
//   return (
//     <>
//       <div className="col-md-4 mb-4 p-1 d-flex" >
//         <div class="card h-100 text-center p-4" key={product.id} >
//           <img src={product.image} class="card-img-top mb-2" alt={product.title} height="250px"/>
//           <div class="card-body">
//             <h5 class="card-title mb-0">{product.title.substring(0,12)}...</h5>
//             <p class="card-text lead fw-bold">
//                 ${product.price}
//             </p>
//             <a href="#" class="btn btn-outline-dark">
//               Buy Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
//})}

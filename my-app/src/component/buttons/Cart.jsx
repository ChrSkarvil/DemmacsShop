import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delCart, addCart } from '../../redux/action/index';

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delCart(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.qty > 1) {
      dispatch(delCart(item));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  const handlePayNow = () => {
    // Implement the functionality for payment here
    alert('Payment functionality to be implemented.');
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-md-6 mb-5">
                <div className="d-flex align-items-center mb-3">
                  <div style={{ maxWidth: '100px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title mb-0">{item.title}</h5>
                    <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleClose(item)}
                        disabled={item.qty > 1}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      <span className="me-2">{item.qty}</span>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="fw-bold fs-5">Total Price: ${calculateTotalPrice()}</p>
            <button className="btn btn-success" onClick={handlePayNow}>
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

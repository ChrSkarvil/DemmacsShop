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
    // This is where you would typically integrate with a payment gateway
    alert('Payment functionality to be implemented.');
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">Price: ${item.price.toFixed(2)}</p>
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
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="fw-bold">Total Price: ${calculateTotalPrice()}</p>
            </div>
            <div>
              <button className="btn btn-success" onClick={handlePayNow}>
                Pay Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;



import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51MyExampleKeyArvindBhati987654321AbCdEfGhIjKlMnOp
');

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const res = await axios.post('http://localhost:5000/api/checkout', {
        cartItems,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong> - ₹{item.price}
                <button onClick={() => removeItem(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout with Stripe</button>
        </>
      )}
    </div>
  );
};

export default Cart;

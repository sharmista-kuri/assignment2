import React, { useState } from 'react';

const Cart = ({ cart, incrementQuantity, decrementQuantity, removeFromCart, moveToWishlist }) => {
  const [feedback, setFeedback] = useState('');

  const handleMoveToWishlist = (product) => {
    moveToWishlist(product);
    setFeedback('Moved to wishlist!');
    setTimeout(() => setFeedback(''), 2000);  // Clear feedback after 2 seconds
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {feedback && <div className="feedback">{feedback}</div>}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => incrementQuantity(item)}>+</button>
              <button onClick={() => decrementQuantity(item)}>-</button>
              <button onClick={() => removeFromCart(item)}>Remove</button>
              <button onClick={() => handleMoveToWishlist(item)}>Move to Wishlist</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

import React, { useState } from 'react';

const Wishlist = ({ wishlist, moveToCart, removeFromWishlist }) => {
  const [feedback, setFeedback] = useState('');

  const handleMoveToCart = (product) => {
    moveToCart(product);
    setFeedback('Moved to cart!');
    setTimeout(() => setFeedback(''), 2000);  // Clear feedback after 2 seconds
  };

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {feedback && <div className="feedback">{feedback}</div>}
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
              <button onClick={() => removeFromWishlist(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;

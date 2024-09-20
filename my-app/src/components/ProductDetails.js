import React from 'react';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: 'Laptop', price: 1000, description: 'High-performance laptop for work and gaming.' },
  { id: 2, name: 'Smartphone', price: 800, description: 'Smartphone with excellent camera and battery life.' },
  { id: 3, name: 'Headphones', price: 100, description: 'Noise-cancelling headphones with rich sound quality.' }
];

const ProductDetails = ({ addToCart, addToWishlist }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;

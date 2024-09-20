import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

const App = () => {
  // Initialize cart and wishlist from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, total: product.price }]);
    }
  };

  const incrementQuantity = (product) => {
    setCart(cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
        : item
    ));
  };

  const decrementQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price }
        : item
    ).filter((item) => item.quantity > 0);  // Remove item if quantity reaches 0
    setCart(updatedCart);
  };

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const moveToWishlistFromCart = (product) => {
    // Add to wishlist only if it's not already there
    addToWishlist(product);
    // Remove from cart
    removeFromCart(product);
  };

  const moveToCartFromWishlist = (product) => {
    // Add to cart if not already there, or increment quantity
    addToCart(product);
    // Remove from wishlist
    removeFromWishlist(product);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const removeFromWishlist = (product) => {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlist={wishlist} />} />
        <Route path="/cart" element={<Cart cart={cart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} moveToWishlist={moveToWishlistFromCart} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} moveToCart={moveToCartFromWishlist} removeFromWishlist={removeFromWishlist} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} />} />
      </Routes>
    </Router>
  );
};

export default App;
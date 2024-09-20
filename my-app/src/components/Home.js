import React, { useState, useEffect } from 'react';

const Home = ({ addToCart, addToWishlist, removeFromWishlist, wishlist }) => {
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Fetch product data from the JSON file
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  useEffect(() => {
    // This effect will run whenever the 'wishlist' prop changes
    console.log("Wishlist updated:", wishlist); // Add this for debugging
  }, [wishlist]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setFeedback('Added to cart!');
    setFeedbackType('success');
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 2000); // Clear feedback after 2 seconds
  };

/*   const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setFeedback('Added to wishlist!');
    setFeedbackType('success');
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 2000); // Clear feedback after 2 seconds
  }; */

  const handleAddToWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      // Product is already in the wishlist, so remove it
      removeFromWishlist(product);
      setFeedback('Removed from wishlist!');
    } else {
      // Product is not in the wishlist, so add it
      addToWishlist(product);
      setFeedback('Added to wishlist!');
    }
    setFeedbackType('success');
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 2000); 
  };

  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = product.price >= min && product.price <= max;
    return matchesSearchTerm && matchesPriceRange;
  });

  return (
    <div className="home">
      <h1>Product List</h1>

      <div className="filter-form">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {feedback && (
        <div className={`feedback ${feedbackType}`}>
          {feedback}
        </div>
      )}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div key={product.id} className="image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <i
                    className={`far fa-heart wishlist-icon ${wishlist.some(item => item.id === product.id) ? 'fas fa-heart in-wishlist' : 'far fa-heart not-in-wishlist'}`}
                    onClick={() => handleAddToWishlist(product)}
                  ></i>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart"
              >
                Add to Cart
              </button>
              
            </div>
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

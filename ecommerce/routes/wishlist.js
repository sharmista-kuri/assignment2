const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist'); // Assuming Wishlist model is defined

// Get all items in the wishlist
router.get('/', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.json(wishlistItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add an item to the wishlist
router.post('/add', async (req, res) => {
  console.log('Product ID received in wishlist/add:', req.body.productId);
  const { productId, name, price, image } = req.body;

  // Log to verify productId is received
  console.log('Received data for wishlist:', req.body);

  try {
    const wishlistItem = new Wishlist({
      productId,
      name,
      price,
      image,
    });
    const savedItem = await wishlistItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Remove an item from the wishlist by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Wishlist item not found' });
    res.json({ message: 'Item removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/check/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Convert productId to ObjectId and check if it exists in the cart
    const itemExists = await Wishlist.exists({ productId: new mongoose.Types.ObjectId(productId) });
    res.json({ exists: !!itemExists }); // Return boolean result
  } catch (err) {
    console.error('Error in /check/:productId route:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific wishlist item by productId
router.get('/item/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log('Requested productId:', productId); 

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Find the specific wishlist item by productId
    const wishlistItem = await Wishlist.findOne({ productId: new mongoose.Types.ObjectId(productId) });
    
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json(wishlistItem);
  } catch (err) {
    console.error('Error in /item/:productId route:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

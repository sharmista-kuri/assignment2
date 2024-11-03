// routes/cart.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require('../models/Cart'); // Ensure this model exists and is set up properly

// Add an item to the cart or update quantity if it already exists
// routes/cart.js
router.post('/add', async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;

  console.log('Received data in /add:', req.body);

  try {
    const total = price * quantity;
    const cartItem = await Cart.findOneAndUpdate(
      { productId: new mongoose.Types.ObjectId(productId) }, 
      { $set: { name, price, image }, $inc: { quantity: quantity, total: total } },
      { new: true, upsert: true }
    );
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all items in the cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity of an item in the cart
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });

    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove an item from the cart
router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check if a product is already in the cart
router.get('/check/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Convert productId to ObjectId and check if it exists in the cart
    const itemExists = await Cart.exists({ productId: new mongoose.Types.ObjectId(productId) });
    res.json({ exists: !!itemExists }); // Return boolean result
  } catch (err) {
    console.error('Error in /check/:productId route:', err.message);
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;



const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  getProductById,
  getRecommendedProducts
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.get('/recommend/ai', getRecommendedProducts); // AI recommendation route

module.exports = router;

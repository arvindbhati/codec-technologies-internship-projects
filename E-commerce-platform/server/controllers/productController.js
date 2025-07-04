

const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const search = req.query.search || '';
  const filter = req.query.category || '';

  try {
    const products = await Product.find({
      name: { $regex: search, $options: 'i' },
      category: { $regex: filter, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, image, category });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecommendedProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // Simple AI logic: recommend top 5 based on similarity in name/category
    const recommendations = allProducts.slice(0, 5); // mock recommendation
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

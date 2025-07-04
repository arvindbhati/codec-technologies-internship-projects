

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      setForm({ name: '', description: '', price: '', image: '', category: '' });
      fetchProducts();
      alert('Product added');
    } catch (err) {
      alert('Error adding product');
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={addProduct} style={{ marginBottom: '20px' }}>
        <h3>Add Product</h3>
        {['name', 'description', 'price', 'image', 'category'].map((field) => (
          <input
            key={field}
            type={field === 'price' ? 'number' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            required
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={{ display: 'block', marginBottom: '10px' }}
          />
        ))}
        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: '10px' }}>
            <strong>{p.name}</strong> - ₹{p.price}
            <button onClick={() => deleteProduct(p._id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

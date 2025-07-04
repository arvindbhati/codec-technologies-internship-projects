

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

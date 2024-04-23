import { Link } from "react-router-dom";
import Paginator from "./Paginator";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://localhost:7192/api/Product?page=${currentPage}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderProducts = () => {
    return products.map((product) => (
        <div key={product.id} className="product">
            <div className="product-info">
                <p><b>{product.name}</b> Product Code: {product.code}</p>
                <p>{product.description}</p>
                <p className="stock">Stock: {product.stock}</p>
            </div>
            <div className="product-actions">
                <p className="price">Price: ${product.price}</p>
                <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    max={product.stock}
                    id={`quantity-${product.id}`}
                />
                <button onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
            </div>
        </div>
    ));
  };

  return (
    <div>
      <Link to="/cart">
        <button>Go to Cart</button>
      </Link>
      {renderProducts()}
      <Paginator
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default ProductList;
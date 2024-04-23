import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://localhost:7192/api/Product?page=${currentPage}`)
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const addToCart = (productId) => {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);

    validateStock(productId, quantity)
      .then((response) => {
        if (response.data) {
          const newCart = { ...cart };
          if (newCart[productId]) {
            newCart[productId] += quantity;
          } else {
            newCart[productId] = quantity;
          }
          setCart(newCart);
          alert("Product successfully added");
        } else {
          alert("There is not enough stock available.");
        }
      })
      .catch((error) => {
        console.error("Error validating stock:", error);
        alert("There was an error validating the stock.");
      });
  };

  const validateStock = (productId, quantity) => {
    return axios.get(`https://localhost:7192/api/Product/CheckStock/${productId}/${quantity}`)
  };

  const removeFromCart = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const newCart = { ...cart };
    newCart[productId] = newQuantity;
    setCart(newCart);
  };

  const processOrder = () => {
    // Products array
    const products = Object.keys(cart).map((productId) => ({
      productId: parseInt(productId),
      quantity: cart[productId]
    }));

    // Object by send to server
    const orderData = {
      customerId: 1, // customerId, default 1
      products: products
    };

    // POST request
    axios.post("https://localhost:7192/api/Order", orderData)
      .then((response) => {
        console.log("Order successfully processed:", response.data);
        // Clear cart
        setCart({});
        alert("The purchase has been processed successfully.");
      })
      .catch((error) => {
        console.error("Error while processing the purchase:", error);
        alert("There was an error processing the purchase. Please try again later.");
      });
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Router>
      <div className="App">
        <h1>Product List</h1>
        <Routes>
          <Route path="/" exact element={<ProductList products={products} addToCart={addToCart} /> } >
          </Route>
          <Route path="/cart" exact element={<Cart cart={cart} products={products} removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              processOrder={processOrder} /> } />
        </Routes>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    </Router>
  );
}

export default App;

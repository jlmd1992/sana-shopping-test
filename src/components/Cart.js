import { Link } from "react-router-dom";

const Cart = ({ cart, products, removeFromCart, updateQuantity, processOrder }) => {
    // Function to calculate total by product (product x quantity)
    const calculateTotal = (productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      const quantity = cart[productId];
      return product.price * quantity;
    };
  
    // Function to calculate order total 
    const calculateOrderTotal = () => {
      let total = 0;
      Object.keys(cart).forEach((productId) => {
        total += calculateTotal(productId);
      });
      return total;
    };
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {Object.keys(cart).map((productId) => (
            <li key={productId}>
              <div>
                <span>{products.find((product) => product.id === parseInt(productId)).name}</span>
                <span> - </span>
                <span>Product Code: {products.find((product) => product.id === parseInt(productId)).code}</span>
                <span> - </span>
                <span>Quantity:</span>
                <input
                  type="number"
                  value={cart[productId]}
                  min="1"
                  onChange={(e) => updateQuantity(productId, parseInt(e.target.value))}
                />
                <span> - </span>
                <span>Total Product Price: ${calculateTotal(productId)}</span>
                <button onClick={() => removeFromCart(productId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h3>Order Summary</h3>
          <p>Total Order:</p>
          <p>${calculateOrderTotal()}</p>
        </div>
        <button onClick={processOrder} disabled={Object.keys(cart).length === 0}>Process Order</button>
        <div>
            <br></br>
            <Link to="/">
                <button>Back to Product List</button>
            </Link>
        </div>        
      </div>
    );
};

export default Cart;
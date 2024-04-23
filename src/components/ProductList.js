import { Link } from "react-router-dom";

const ProductList = ({ products, addToCart, cart }) => {
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
    </div>
  );
};

export default ProductList;
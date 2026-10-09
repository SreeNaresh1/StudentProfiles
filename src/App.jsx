import { useEffect, useState } from "react";
import "./App.css";

const PRODUCT_NAME = "Wireless Mouse";
const PRODUCT_PRICE = 499;

function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
    </header>
  );
}

function ProductCard({
  productName,
  price,
  quantity,
  selectedColor,
  deliveryCity,
}) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = `${productName} | ${selectedColor} | Cart: ${quantity}`;

    return () => {
      document.title = previousTitle;
    };
  }, [productName, selectedColor, quantity]);

  const totalAmount = quantity * price;

  return (
    <section className="product-card">
      <div className={`product-image ${selectedColor.toLowerCase()}`}>
        <div className="mouse">
          <div className="mouse-wheel" />
        </div>
      </div>

      <div className="product-details">
        <h2>{productName}</h2>

        <p className="price">
          ₹{price} <span>per item</span>
        </p>

        <p>
          Colour: <strong>{selectedColor}</strong>
        </p>

        <p>
          Deliver to: <strong>{deliveryCity || "Not specified"}</strong>
        </p>

        <hr />

        <p>Cart Quantity: {quantity}</p>
        <h3>Total Amount: ₹{totalAmount}</h3>

        <p className={quantity === 0 ? "empty-status" : "success-status"}>
          {quantity === 0 ? "Cart is empty" : "Product added to cart"}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Amazon Product Store
    </footer>
  );
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  function addToCart() {
    setQuantity((previousQuantity) => previousQuantity + 1);
  }

  function removeOne() {
    setQuantity((previousQuantity) => Math.max(0, previousQuantity - 1));
  }

  function resetCart() {
    setQuantity(0);
  }

  return (
    <div className="app">
      <Header />

      <div className="tab-title">
        Tab title: {PRODUCT_NAME} | {selectedColor} | Cart: {quantity}
      </div>

      <main className="content">
        {showProduct && (
          <ProductCard
            productName={PRODUCT_NAME}
            price={PRODUCT_PRICE}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}

        <div className="controls">
          <label>
            Product colour
            <select
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </label>

          <label>
            Delivery city
            <input
              type="text"
              value={deliveryCity}
              onChange={(event) => setDeliveryCity(event.target.value)}
              placeholder="Enter delivery city"
            />
          </label>
        </div>

        <div className="button-group">
          <button className="add-button" onClick={addToCart}>
            Add to Cart
          </button>

          <button onClick={removeOne} disabled={quantity === 0}>
            Remove One
          </button>

          <button onClick={resetCart}>Reset Cart</button>

          <button onClick={() => setShowProduct((previous) => !previous)}>
            {showProduct ? "Hide Product" : "Show Product"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
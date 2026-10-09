<<<<<<< HEAD
import { useEffect, useState } from "react";
import "./App.css";

const PRODUCT_NAME = "Wireless Mouse";
const PRODUCT_PRICE = 499;
=======
import "./App.css";

const student1 = {
  name: "Anu",
  department: "CSE",
  year: "3rd Year",
};

const student2 = {
  name: "Bala",
  department: "Computer Science",
  year: "3rd Year",
};
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c

function Header() {
  return (
    <header className="header">
<<<<<<< HEAD
      <h1>Amazon Product Store</h1>
=======
      <h1>Student Management System</h1>
      <p>Student Profile Management</p>
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c
    </header>
  );
}

<<<<<<< HEAD
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
=======
function StudentProfile({ name, department, year }) {
  return (
    <div className="student-profile">
      <h2>{name}</h2>

      <p>
        <strong>Department:</strong> {department}
      </p>

      <p>
        <strong>Year:</strong> {year}
      </p>
    </div>
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c
  );
}

function Footer() {
  return (
    <footer className="footer">
<<<<<<< HEAD
      © 2026 Amazon Product Store
=======
      © 2026 Student Management System
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c
    </footer>
  );
}

function App() {
<<<<<<< HEAD
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

=======
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c
  return (
    <div className="app">
      <Header />

<<<<<<< HEAD
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
=======
      <main className="content">
        <section>
          <h2 className="student-title">Student 1</h2>

          <StudentProfile
            name={student1.name}
            department={student1.department}
            year={student1.year}
          />
        </section>

        <section>
          <h2 className="student-title">Student 2</h2>

          <StudentProfile
            name={student2.name}
            department={student2.department}
            year={student2.year}
          />
        </section>
>>>>>>> fa71d2575d03d37773d1fa5804e08bd0d473200c
      </main>

      <Footer />
    </div>
  );
}

export default App;
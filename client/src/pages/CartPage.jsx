// client/src/pages/CartPage.jsx
import React, { useState } from "react"; // Import useState
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    try {
      await axios.post("http://localhost:5000/api/checkout", cartItems, config);
      alert("Checkout successful! Your order has been placed.");
      clearCart(); // Clear the cart from context and local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("There was an error during checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Your Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty!</h3>
          <p>Looks like you haven't added any products yet.</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product_id} className="booking-card">
              <div className="booking-details">
                <span className="product-name">
                  {item.product_name} (x{item.quantity})
                </span>
                <span className="booking-date">
                  Price: ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              {/* ▼▼▼ CHANGE THE CLASSNAME ON THIS BUTTON ▼▼▼ */}
              <button
                onClick={() => removeFromCart(item.product_id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
          <div
            style={{
              textAlign: "right",
              marginTop: "2rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            <h3>Total: ₹{totalPrice}</h3>
            <button
              onClick={handleCheckout}
              className="cta-button"
              style={{ marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

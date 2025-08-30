// client/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // 1. Clear the cart from React's state
    clearCart();

    // 2. Forcefully remove user token AND cart items from browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems"); // <-- The guaranteed fix

    // 3. Navigate the user away
    navigate("/login");
  };

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">GramSeva</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#products">Products</a>
        <a href="/#contact">Contact</a>
        <Link
          to="/cart"
          style={{ position: "relative", display: "inline-block" }}
        >
          🛒 Cart
          {cartItemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-15px",
                background: "var(--error-color)",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartItemCount}
            </span>
          )}
        </Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <a
              href="#"
              onClick={handleLogout}
              className="nav-button"
              style={{ backgroundColor: "var(--error-color)" }}
            >
              Logout
            </a>
          </>
        ) : (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

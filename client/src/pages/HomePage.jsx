// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:5000/api";

const HomePage = () => {
  // ... your existing state and useEffect logic remains the same
  const { addToCart } = useCart();
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, productsRes] = await Promise.all([
          axios.get(`${API_URL}/services`),
          axios.get(`${API_URL}/products`),
        ]);
        setServices(servicesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/contact`, contactForm);
      alert("Thank you for your message!");
      setContactForm({ name: "", message: "" });
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  const handleBookNow = async (productId, productName) => {
    const token = localStorage.getItem("token");

    // 1. Check if user is logged in
    if (!token) {
      alert("Please log in to book products.");
      navigate("/login"); // Redirect to login page
      return;
    }

    // 2. Prepare the API request
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const body = {
      productId: productId,
      quantity: 1, // For now, we'll just book 1 item
    };

    // 3. Send the request to the backend
    try {
      await axios.post(`${API_URL}/bookings`, body, config);
      alert(
        `Successfully booked ${productName}! Check your dashboard to see your bookings.`
      );
    } catch (error) {
      console.error("Booking failed:", error);
      alert("There was an error booking this product. Please try again.");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section (already full-width) */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Empowering Rural India,
            <br />
            <span className="hero-tagline">One Delivery at a Time.</span>
          </h1>
          <p>
            Get essential groceries, medicines, and services delivered right to
            your doorstep. Simple, fast, and reliable.
          </p>
          <a href="#products" className="cta-button">
            Browse Products
          </a>
        </div>
      </section>

      {/* CORRECTED STRUCTURE FOR SERVICES SECTION */}
      <section id="services" className="section">
        <div className="container">
          <h2>Our Services</h2>
          <p className="section-subtitle">
            Connecting rural communities with essential services for a better
            tomorrow.
          </p>
          <div className="grid-container">
            {services.map((s) => (
              <div key={s.service_id} className="card">
                <div className="card-content">
                  <h3>{s.service_name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The rest of the sections are wrapped in their own container */}
      <div className="container">
        <section id="how-it-works" className="section">
          <h2>How It Works</h2>
          <p className="section-subtitle">
            A simple 3-step process to get what you need.
          </p>
          <div className="grid-container">
            <div className="how-it-works-step">
              <div className="step-icon">1</div>
              <h3>Browse & Select</h3>
              <p>Explore our wide range of products and services.</p>
            </div>
            <div className="how-it-works-step">
              <div className="step-icon">2</div>
              <h3>Place Your Order</h3>
              <p>
                Add items to your cart and place an order via our app or
                helpline.
              </p>
            </div>
            <div className="how-it-works-step">
              <div className="step-icon">3</div>
              <h3>Quick Delivery</h3>
              <p>
                We ensure your essentials are delivered to you safely and on
                time.
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <h2>Available Products</h2>
          <p className="section-subtitle">
            Quality groceries, medicines, and supplies delivered right to you.
          </p>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products in Kurnool, Nandyal, etc..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid-container">
            {filteredProducts.map((p) => (
              <div key={p.product_id} className="card">
                <img
                  src={p.image_url || "https://via.placeholder.com/300"}
                  alt={p.product_name}
                  className="card-image"
                />
                <div className="card-content">
                  <h3>{p.product_name}</h3>
                  <p className="price">₹{p.price}</p>
                  <button className="card-button" onClick={() => addToCart(p)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="section">
          <h2>Voices from Our Community</h2>
          <p className="section-subtitle">
            See what people in your community are saying about GramSeva.
          </p>
          <div className="grid-container">
            <div className="testimonial-card">
              <p>
                "GramSeva has been a lifesaver. Getting medicines for my parents
                is so much easier now. Thank you!"
              </p>
              <span className="testimonial-author">- Ramesh, Kurnool</span>
            </div>
            <div className="testimonial-card">
              <p>
                "The service is very reliable. I ordered farming supplies and
                they arrived the next day as promised."
              </p>
              <span className="testimonial-author">- Sunita, Nandyal</span>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="form-container">
            <h2>Get In Touch</h2>
            <p style={{ marginTop: "0", textAlign: "center" }}>
              Have questions? Send us a message!
            </p>
            <form
              onSubmit={handleContactSubmit}
              style={{ marginTop: "2rem", padding: 0, boxShadow: "none" }}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

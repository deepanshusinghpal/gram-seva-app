// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { "x-auth-token": token } };
      try {
        const [profileRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/profile", config),
          axios.get("http://localhost:5000/api/bookings", config),
        ]);
        setUser(profileRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="container">
        <p>Loading dashboard...</p>
      </div>
    );
  if (!user)
    return (
      <div className="container">
        <p>Could not load user data.</p>
      </div>
    );

  return (
    <div className="container">
      <section
        className="section"
        style={{ textAlign: "left", paddingTop: "3rem" }}
      >
        {/* ▼▼▼ THIS IS THE NEW, PROFESSIONAL HEADER ▼▼▼ */}
        <div className="dashboard-welcome-header">
          <h1>Dashboard</h1>
          <p>
            {getGreeting()}, <span className="username">{user.username}!</span>{" "}
            Welcome back.
          </p>
        </div>

        <section>
          <h3>Your Bookings</h3>
          {bookings.length > 0 ? (
            <div className="booking-list">
              {bookings.map((booking) => (
                <div key={booking.booking_id} className="booking-card">
                  <div className="booking-details">
                    <span className="product-name">{booking.product_name}</span>
                    <span className="booking-date">
                      Booked on:{" "}
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div
                    className={`booking-status status-${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No Bookings Yet!</h3>
              <p>
                It looks like you haven't booked any products. Let's get you
                some essentials.
              </p>
              <Link
                to="/#products"
                className="cta-button"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Browse Products
              </Link>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default DashboardPage;

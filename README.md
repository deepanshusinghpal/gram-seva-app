# GramSeva - Full-Stack Rural Services Platform 🇮🇳

> A full-stack web application designed as a prototype to bridge the gap between rural communities and essential services. This project provides a seamless, modern user experience for browsing products, managing a cart, and booking orders securely.

---
## 📸 Screenshots

A showcase of the application's primary user interface and features.

| Homepage                                              | Shopping Cart                                      | User Dashboard                                   |
| :---------------------------------------------------: | :------------------------------------------------: | :--------------------------------------------------: |
| ![Homepage Screenshot](./.github/assets/homepage.png) | ![Cart Page Screenshot](./.github/assets/cart.png) | ![Dashboard Screenshot](./.github/assets/dashboard.png) |                                             |                                                  |


---
## ✨ Key Features

-   **🎨 Modern & Responsive UI:** Built with React, the interface is clean, intuitive, and provides a seamless experience on both desktop and mobile devices.
-   **🔐 Secure User Authentication:** A complete JWT-based system for user registration and login. Passwords are fully encrypted using `bcrypt`.
-   **🛍️ Product Catalog & Search:** Users can view a list of available products and filter them in real-time with a dynamic search bar.
-   **🛒 Professional Shopping Cart:** A persistent shopping cart system built with the React Context API. The cart state is saved in `localStorage`, so items are not lost if the page is refreshed or the tab is closed.
-   **👤 User Dashboard:** A protected, private route for logged-in users to view a personalized welcome message and a history of all their past bookings.
-   **🔗 Smart Navigation:** The application correctly handles scrolling, automatically scrolling to the top on new pages and to specific sections when using anchor links.

---
## 🛠️ Technology Stack

| Frontend | Backend | Database |
| :---: | :---: | :---: |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | |

---
## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
* [npm](https://www.npmjs.com/) (which is included with Node.js)
* [PostgreSQL](https://www.postgresql.org/download/)

### Local Development Setup

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/deepanshusinghpal/gram-seva-app.git](https://github.com/deepanshusinghpal/gram-seva-app.git)
    cd gram-seva-app
    ```

2.  **Setup the Backend Server**
    ```sh
    # 1. Navigate to the server directory
    cd server

    # 2. Install dependencies
    npm install

    # 3. Create a .env file in the /server directory (see .env.example below)

    # 4. In PostgreSQL, create a new database named 'gram_seva' and run the SQL schema script 
    #    to create all necessary tables and insert dummy data.

    # 5. Start the backend server (it will run on http://localhost:5000)
    npm run dev
    ```

3.  **Setup the Frontend Client**
    ```sh
    # 1. Open a new terminal window and navigate to the client directory from the root
    cd client

    # 2. Install dependencies
    npm install

    # 3. Start the frontend development server (it will open in your browser at http://localhost:5173)
    npm run dev
    ```

### Environment Variables (`.env`)
Create a file named `.env` in the `/server` directory and add your credentials.

DATABASE_URL=postgresql://YOUR_POSTGRES_USERNAME:YOUR_POSTGRES_PASSWORD@localhost:5432/gram_seva
JWT_SECRET=thisisareallystrongandsecuresecretkeythatshouldnotbeshared

---
## 👤 Demo Login

To test the user-specific features, you can either register a new account or use the following credentials **after creating the user on the signup page**.

* **Email:** `testuser@example.com`
* **Password:** `password123`
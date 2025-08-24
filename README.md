# 👗 Fashion Hub – eCommerce Fashion Store Project - Group 3

[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?logo=vue.js)](https://vuejs.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)  
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql)](https://www.mysql.com/)  
[![JWT](https://img.shields.io/badge/JWT-Security-black?logo=jsonwebtokens)](https://jwt.io/)  
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)](https://getbootstrap.com/)  

A modern **full-stack eCommerce platform** built with **Vue.js, Node.js, Express, and MySQL**.  
Fashion Hub allows users to browse trendy fashion items, filter by categories, and place orders securely with JWT authentication.  

---

## ✨ Features  

- 🛍 **Browse Without Sign-In** – Guests can explore the full shop without creating an account.  
- 🔐 **Authentication with JWT** – Users must create an account & log in to make purchases and track orders.  
  - Tokens expire in **15 minutes**.  
  - Middleware automatically verifies tokens.  
  - Expired sessions redirect back to **Login**.  
- 👋 **Welcome Experience** – After login, users are redirected to the Home page with a personalized welcome in the navbar.  
- 📦 **Product Catalog** – Shop with category navigation and filter bar for easy discovery.  
- 🛒 **Shopping Cart** –  
  - Add items to cart (stored in MySQL).  
  - Update quantities and remove items.  
  - Persisted across sessions.  
- 💳 **Checkout Flow** –  
  - Enter shipping details, payment method & confirmation.  
  - Orders are stored in MySQL and can be tracked later.  
- 📑 **Order Tracking** – Dynamic simulated order system showing progress.  
- 📧 **Contact Page** – Users can contact the admin (**Laila Abdurahman**) via email using **Web3Forms**.  
- 📱 **Responsive Design (In Progress)** – Ongoing work on making the shop and all components fully mobile-friendly.  

---

## 🛠 Tech Stack  

**Frontend**  
- Vue.js (Vue Router + Vuex)
- Css  
- Bootstrap (UI & layout)  

**Backend**  
- Node.js + Express  
- CommonJS for utility functions  
- MySQL (Relational Database)  

**Authentication**  
- JSON Web Tokens (JWT)  
- Middleware for token verification  

**Other Tools**  
- Nodemon (dev server)  
- Web3Forms (Contact form handling)  

---

## 📡 API Endpoints  
** All tested via Thunder Client **
- **api/auth** – Signup, Login (returns JWT token)  
- **api/products** – Fetch all products (with categories & filters)  
- **api/cart** – Add, update, or remove items from user’s cart  
- **api/orders** – Place & track orders (linked to logged-in user)  

---

## 🚀 Getting Started  

Follow these steps to set up the project locally:  

### 1️⃣ Clone the Repository  
```bash
git clone (https://github.com/kxngzero329/M3_Project_Module_E-Commerce_Mogamat_Ay-yoob_Sipho_Laila_Atang.git)
cd fashion-hub
```

### 2️⃣ Install Dependencies  
Frontend:  
```bash
cd frontend
npm install
```

Backend:  
```bash
cd backend
npm install
```

### 3️⃣ Database Setup (MySQL)  
- Create a database in MySQL (e.g., `fashion_store`).  
- Import the provided schema (`fashion_store.sql`).  
- Update your database credentials in the backend `db/db.js` file:  
```Should look like this
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'fashion_store'
```

### 4️⃣ Run the Project  
Frontend (Vue):  
```bash
npm run serve
```

Backend (Express):  
```bash
npm run dev
# or
nodemon server.js
```

---

## 📷 Screenshots (Optional)  
*(Add images of your UI here for a more visual README.)*  

---

## 📌 Notes  

- Session tokens expire every **15 minutes**.  
- Responsive design for the shop is **still in progress**.  
- Orders persist thanks to **MySQL + LocalStorage sync**.  

---

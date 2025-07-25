# 🚀 MERN Inventory Pro - Advanced Product Management System

A full-stack inventory management solution built with the MERN stack, featuring role-based access control, real-time updates, and comprehensive product analytics.

## 🌟 Key Features

### 🔒 Authentication System
- JWT-based authentication with httpOnly cookies
- Role-based authorization (Admin/User)
- Secure password hashing with bcrypt
- Session management

### 🛍️ Product Management
- **Admin Privileges**:
  - Add new products with images
  - Update product details inline
  - Adjust inventory quantities in real-time
  - Bulk import/export functionality
- **User Access**:
  - Browse product catalog
  - Search and filter products
  - View product details

### 📊 Advanced Analytics Dashboard
- Inventory overview
- Low stock alerts
- Sales trends visualization
- Exportable reports

### 🛠️ Technical Highlights
- RESTful API with proper status codes
- Responsive UI with dark/light mode
- Form validation on client and server
- Error handling middleware
- Dockerized for easy deployment

## 🧰 Tech Stack

| Area              | Technologies Used                          |
|-------------------|-------------------------------------------|
| **Frontend**      | React 18, Tailwind CSS, Redux Toolkit, Axios, React Query, Chart.js |
| **Backend**       | Node.js, Express, Mongoose, JWT, Bcrypt   |
| **Database**      | MongoDB Atlas (Cloud)                     |
| **DevOps**        | Docker, Docker Compose, GitHub Actions    |
| **Hosting**       | Vercel (Frontend), Render (Backend)       |
| **Monitoring**    | Winston Logging, Sentry Error Tracking    |

## 📂 Project Structure

mern-inventory-pro/
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── server.js       # Express server
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── assets/     # Images, icons
│       ├── components/ # Reusable UI
│       ├── features/   # Feature modules
│       ├── hooks/      # Custom hooks
│       ├── pages/      # Application views
│       ├── store/      # Redux store
│       ├── styles/     # Global styles
│       ├── utils/      # Frontend utilities
│       └── App.jsx     # Main component
├── docker-compose.yml  # Multi-container setup
├── Dockerfile          # Backend container config
├── Dockerfile.frontend # Frontend container config
└── README.md           # Project documentation

🚦 API Endpoints

🔐 Authentication

Method	 Endpoint	           Description	           Auth Required
POST	   /api/auth/register	 User registration	        ❌
POST	   /api/auth/login	   User login	                ❌
POST	   /api/auth/logout	   User logout	              ✅
GET	     /api/auth/me	       Get current user info	    ✅

📦 Products

Method	 Endpoint          	          Description	                Admin Only
GET	     /api/products	              Get all products (paginated)	 ❌
GET	     /api/products/:id	          Get single product	           ❌
POST	   /api/products	              Create new product	           ✅
PATCH	   /api/products/:id	          Update product details	       ✅
PATCH	   /api/products/:id/quantity 	Update stock quantity	         ✅
DELETE	 /api/products/:id	          Delete product	               ✅

📊 Analytics

Method	Endpoint	              Description	      Admin Only
GET	    /api/analytics/summary	Inventory summary   	✅
GET   	/api/analytics/trends	  Sales trends	        ✅

🛠️ Installation

Prerequisites

Node.js v18+
MongoDB Atlas URI

Local Development

Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

📧 Contact
Paras Rajain - parasrajain7@gmail.com















# 🛒 Cartify - Full-Stack E-Commerce Platform

A modern, feature-rich e-commerce platform built with React, TypeScript, Express, and MongoDB. Cartify provides a complete shopping experience with user authentication, secure payments, order management, and comprehensive admin controls.

## 🎯 Project Overview

Cartify is a full-stack e-commerce solution that enables businesses to create and manage online stores with ease. The platform offers a seamless shopping experience for customers while providing powerful administrative tools for store management.

## ✨ Key Features

### ✅ User Authentication & Authorization

- Secure user registration and login
- Role-based access control (User/Admin)
- Protected routes and API endpoints
- Session management

### ✅ User & Admin Dashboards

- **User Dashboard**: Order history, profile management, wishlist
- **Admin Dashboard**: Sales analytics, user management, inventory overview
- Real-time statistics and insights

### ✅ Order Management & Status Tracking

- Complete order lifecycle management
- Real-time order status updates
- Order history and tracking
- Automated status transitions

### ✅ Secure Payment Gateway

- Integrated Paystack payment processing
- Secure transaction handling
- Payment confirmation and receipts
- Multiple payment methods support

### ✅ Product Reviews

- Customer review and rating system
- Review moderation tools
- Average rating calculations
- Review display and filtering

### ✅ Admin Product Management

- Add new products with images and details
- Update existing product information
- Delete products
- Bulk product operations
- Inventory management

### ✅ Bulk Email & Newsletter Sending

- Send newsletters to all subscribers
- Targeted email campaigns
- Order confirmation emails
- Promotional email blasts

### ✅ Notification System

- Real-time order notifications
- Email notifications for order updates
- Admin alerts for new orders
- User activity notifications

## 🔄 How It Works

### 1. 🛍️ Users Add Products to Cart

Customers browse the product catalog and add items to their shopping cart. The cart persists across sessions and updates in real-time.

### 2. 💳 Proceed to Checkout and Enter Details

When ready to purchase, users proceed to checkout where they enter shipping information, billing details, and review their order.

### 3. 🔐 Secure Payment via Paystack

Payment is processed securely through Paystack integration. All transactions are encrypted and PCI-compliant.

### 4. 📧 Automatic Email Confirmation

Upon successful payment, customers automatically receive an email confirmation with order details and receipt.

### 5. 🔔 Admin Gets Notified → Confirms Order

Administrators receive instant notifications when new orders are placed and can confirm orders from the admin dashboard.

### 6. 📦 Real-Time Order Status Updates

Users receive real-time updates at every stage of their order:

- **Pending** → Order received, awaiting confirmation
- **Confirmed** → Order confirmed by admin
- **Processing** → Order being prepared
- **Shipped** → Order dispatched for delivery
- **Delivered** → Order successfully delivered

### 7. 📝 Reviews, Newsletters, and Bulk Emails

- Customers can leave product reviews after purchase
- Admins can send newsletters and promotional emails
- Bulk email functionality for marketing campaigns

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Paystack** - Payment gateway

## 📁 Project Structure

```
Cartify/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── screens/    # Page components
│   │   ├── types/      # TypeScript type definitions
│   │   └── ...
│   └── ...
├── backend/           # Express backend API
│   ├── routes/        # API route handlers
│   ├── models/        # Database models
│   ├── types/         # TypeScript type definitions
│   └── ...
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Paystack API keys (for payment processing)

### Installation

1. Clone the repository

```bash
git clone https://github.com/boluwatifeee/Cartify.git
cd Cartify
```

2. Install root dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd backend
npm install
```

4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

5. Set up environment variables

```bash
# Backend .env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
JWT_SECRET=your_jwt_secret
```

6. Run the development servers

```bash
# From root directory
npm run dev
```

This will start both the backend server (port 8000) and frontend dev server (port 5174).

## 📝 License

ISC

## 👤 Author

[Your Name]

---

**Note**: This is a temporary README. Update with actual project details, screenshots, and deployment instructions as the project progresses.

# E-Commerce API

This is a backend project for an E-commerce service. It features a payment system using Stripe. Users can register, login, manage their cart, and pay for products. This project is inspired by roadmap.sh backend challenges.

## Project URL

https://roadmap.sh/projects/ecommerce-api

## Features

Authentication & Security

- User Login: Secure login using JWT (Access Token).
- Role Access: Different access for Admin (manage products) and Customer (shopping).
- Password Hashing: Protecting user passwords with Bcrypt.

Main Functionalities

- Product Management: Admin can add, update, delete, and search for products.
- Cart Management: Customers can add, update, and delete products in their cart.
- Payment: Checkout and pay for products using Stripe.

## Tech Stack

Backend: Node.js, Express.js, Typescript
Database: PostgreSQL
Frontend: HTML5, CSS3, Vanilla JS (Fetch API)
Auth: JWT (JSON Web Token) & Bcrypt
Payment: Stripe API

Project Structure
Following a clean and modular architecture:

```text
├── public/           # Frontend (HTML, CSS, JS Fetch)
├── src/
│   ├── config/       # Database & Env configurations
│   ├── controllers/  # Request & Response handling
│   ├── middlewares/  # Auth, Role validation & File image management
│   ├── models/       # Data Interfaces & Type definitions
│   ├── repositories/ # Data access layer (Direct DB Queries)
│   ├── routes/       # API Endpoint definitions
│   ├── services/     # Business logic & Stripe integration
│   ├── utils/        # Helper functions (Bcrypt, JWT, Error handling)
│   ├── app.ts        # Express application setup
│   └── server.ts     # Server entry point
├── .env              # Secret keys (Stripe, DB, JWT)
└── pnpm-lock.yaml    # Dependency lock file
```

## API Endpoints

Authentication

- POST /customerRegister
  Sign up a new customer.
- POST /customerRegister/Login
  Login for customers.
- POST /adminRegister/Login
  Login for admin users.

Product Management

- POST /product
  Create a new product (Admin only).
- GET /product
  Get all products.
- GET /product/:id
  Get product by ID.
- GET /product/search/:search
  Search products by keyword.
- PUT /product/:id
  Update product details (Admin only).
- Delete /product/:id
  Remove a product (Admin only).

Cart Management

- POST /cart
  Add a product to the cart.
- GET /cart
  View items in the cart.
- PUT /cart/:id
  Update item quantity in the cart.
- Delete /cart/:id
  Remove an item from the cart.

Transaction

- POST /transaction
  Create an order and get Stripe checkout session.
- GET /transaction/verify-payment
  Verify payment status and clear the cart.
- GET /transaction
  View order history/status.

## How to Run

1. Clone the repository.
2. Run pnpm install (since you are using pnpm).
3. Set up your .env file with Database and Stripe credentials.
4. Run npm run dev.

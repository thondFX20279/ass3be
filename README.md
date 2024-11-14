# Shop-App

Shop-App is a backend e-commerce application with essential features for user management, product cataloging, shopping cart functionality, and order processing. Built using Node.js, Express, and MongoDB, this app provides a robust API for managing an online store's backend.

## Features

### 1. User Authentication
   - **Registration**: New users can register with unique usernames and emails. Passwords are hashed for security.
   - **Login**: Registered users can log in, and the server returns a JWT token.

### 2. Product Management
   - **Add Products**: Admins can add new products with name, category, price, description, and images.
   - **Edit Products**: Existing products can be updated by authorized users.
   - **Delete Products**: Products can be removed, and associated images are deleted from the server.
   - **Get All Products**: Fetch all products with pagination support.
   - **Get Product by ID**: Retrieve product details by ID.
   - **Get Categories**: Retrieve unique product categories.
   - **Get Top Trending Products**: Fetches the latest trending products.
   - **Get Related Products**: Fetch products related by category.

### 3. Cart Management
   - **View Cart**: Retrieves user’s cart details, including product information and total price.
   - **Add Product to Cart**: Adds a specified product to the user’s cart with a specified quantity.
   - **Remove Product from Cart**: Removes a specified product from the cart.
   - **Clear Cart**: Empties the user’s cart.
   - **Increase/Decrease Product Quantity**: Adjusts the quantity of items in the cart.

### 4. Order Management
   - **Create Order**: Processes an order based on the user’s cart.
   - **Get Orders**: Retrieves all orders for an admin or specific user orders.
   - **Get Order by ID**: Fetches order details by ID.
   - **Order Confirmation**: Sends an order confirmation email to the user.

### 5. Room and Messaging (Sessions)
   - **Get Rooms**: Retrieves all chat rooms for a session.
   - **Get Room Messages**: Fetches messages for a specified room.
## Setup

1. Clone this repository:
    ```bash
    git clone https://github.com/thondFX20279/ass3be.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add the necessary environment variables (see below).
4. Start the server:
    ```bash
    npm start
    ```
   The server will run on `http://localhost:5000` by default.

## Environment Variables

The following environment variables are required:

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Port for the server (default is 5000)

## API Endpoints

### User Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and receive a JWT token
  
### Product Management

- **GET** `/api/products` - Retrieve all products
- **GET** `/api/products/:productId` - Retrieve a product
- **POST** `/api/products` - Create new product (admin only)
- **PUT** `/api/products/:productId` - Edit a product (admin only)
- **DELETE** `/api/products/:productId` - Delete a product (admin only)

### Cart Management

- **GET** `/api/cart` - Retrieve all cart items
- **POST** `/api/cart` - Add product to cart
- **PUT** `/api/cart/increase/:productId` - Update cart Item
- **PUT** `/api/cart/decrease/:productId` - Update cart item
- **DELETE** `/api/cart/:productId` - Clear cart

### Order Management

- **GET** `/api/orders` - Retrieve all orderrs 
- **GET** `/api/orders/:orderId` - Get order detail
- **POST** `/api/orders` - Create new orders

### Room and Messaging

- **GET** `/api/rooms` - Retrieve all chat rooms (admin only)
- **GET** `/api/rooms/:userId` - Retrieve chat room by id





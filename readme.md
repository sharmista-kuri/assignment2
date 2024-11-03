# E-Commerce Product Page

This project is a simple e-commerce product page built using React.js and Express.js. It allows users to view product details, manage a shopping cart, and add products to a wishlist. The project integrates a backend with Express.js and MongoDB Atlas, and is deployed on an AWS EC2 instance.

## Project Details

- **Deployed Website**: [http://ec2-54-242-151-34.compute-1.amazonaws.com:3001](http://ec2-54-242-151-34.compute-1.amazonaws.com:3001)
- **EC2 Instance IP**: `54.242.151.34:3001` (54.242.151.34:3001) [54.242.151.34:3001](http://54.242.151.34:3001)
- **GitHub Repository**: [https://github.com/ICSI518/assignment2-sharmista-kuri.git](https://github.com/ICSI518/assignment2-sharmista-kuri.git)

## Features

- **Product List**: Display available products.
- **Product Details**: Show details of a selected product with options to add to cart or wishlist.
- **Shopping Cart**: Allows users to update quantities, remove items, and move items to wishlist.
- **Wishlist**: Users can add products to a wishlist and move items back to the cart.
- **Backend Integration**: Uses Express.js for backend API and MongoDB Atlas for data storage.
- **AWS EC2 Deployment**: Deployed using PM2 for process management.

## Prerequisites

- **Node.js** (v20.18.0)
- **MongoDB Atlas** account with a cluster
- **AWS EC2 Instance** with a configured security group

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ICSI518/assignment2-sharmista-kuri.git
````
### 2. Backend Setup

Navigate to the backend folder and install dependencies:
```bash
cd ecommerce-backend
npm install
````
Start the backend server:
```bash
npm start
````
### 3. Frontend Setup

Navigate to the frontend folder and install dependencies:
```bash
cd ../ecommerce
npm install
````
Set up environment variables by creating or editing the .env file in the frontend root directory:
```bash
REACT_APP_API_BASE_URL=http://localhost:3000
````
Build the frontend application:
```bash
npm run build
````
Move the build files to the backend public directory:
```bash
cp -r build/* ../ecommerce-backend/public/
````
### 4. Deploying on AWS EC2

1. **Upload your project to the EC2 instance**.

2. **Install PM2** on the EC2 instance:
   ```bash
   npm install -g pm2
   ````
   ```bash
   pm2 start app.js
   ````

   ```bash
   http://54.242.151.34:3001
   
   ````
## API Documentation

The backend provides several RESTful API routes for managing products, cart, and wishlist:

- **GET /api/products** - Fetch all products
- **POST /api/cart** - Add item to cart
- **GET /api/cart** - View cart items
- **POST /api/wishlist** - Add item to wishlist
- **GET /api/wishlist** - View wishlist items

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Express.js, MongoDB Atlas
- **Deployment**: AWS EC2, PM2

## Contributing

To contribute:

1. Fork the repository.
2. Create a branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Contact

For questions or suggestions, please contact:

- **Name**: Sharmista Kuri
- **Email**: [skuri@albany.edu](mailto:skuri@albany.edu)
- **GitHub**: [https://github.com/sharmista-kuri](https://github.com/sharmista-kuri)

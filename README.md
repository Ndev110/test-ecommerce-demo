# eccomerce-demo# E-commerce API Documentation

## Overview

 API provides endpoints for managing products and orders in an e-commerce application. The API allows for creating, updating, retrieving, and deleting products and orders.

## Base URL

All endpoints are relative to the base URL: `http://localhost:3001`. Replace 3000 with your server's port.

## Content-Type

- All requests and responses use `application/json`.

---

## Product API

### 1. Create a Product

- **Endpoint:** `POST /products`
- **Description:** Adds a new product
- **Request Body:**
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "stock":
  }
- **Response:
201 Created with the created product object.
Example:
{
  "id": 1,
  "name": "Product Name",
  "price": 100,
  "description": "Product Description"
}
Errors:
400 Bad Request if required fields are missing.
### 2.Update a Product
- **Endpoint:** PUT /products/:id
- **Description:** Updates an existing product by ID.
- **Request Body:**

{
  "name": "Updated Product Name",
  "price": 120,
  "description": "Updated Description"
}
Response:
200 OK with the updated product object.
Example:

{
  "id": 1,
  "name": "Updated Product Name",
  "price": 120,
  "description": "Updated Description"
}
Errors:
404 Not Found if the product does not exist.
### 3. Delete a Product
- **Endpoint:** DELETE /products/:id
- **Description:** Deletes a product by ID.
Response:
204 No Content if the deletion is successful.
Errors:
404 Not Found if the product does not exist.
### 4. Get All Products
 - **Endpoint:** GET /products
- **Description:** Retrieves all products.
Response:
200 OK with a list of products.
Example:

[
  {
    "id": 1,
    "name": "Product Name",
    "price": 100,
    "description": "Product Description"
  }
]
Errors:
None
 ## Order API
### 1. Create an Order
- **Endpoint:** POST /orders
- **Description:** Creates a new order.
- **Request Body:**

{
  "productId": 1,
  "quantity": 2,
  "totalPrice": 200
}
Response:
201 Created with the created order object.
Example:

{
  "id": 1,
  "productId": 1,
  "quantity": 2,
  "totalPrice": 200
}
Errors:
400 Bad Request if required fields are missing.
### 2. Update an Order
- **Endpoint:** PUT /orders/:id
- **Description:** Updates an existing order by ID.
- **Request Body:**

{
  "quantity": 3,
  "totalPrice": 300
}
Response:
200 OK with the updated order object.
Example:

{
  "id": 1,
  "productId": 1,
  "quantity": 3,
  "totalPrice": 300
}
Errors:
404 Not Found if the order does not exist.
### 3. Delete an Order
- **Endpoint:**  DELETE /orders/:id
- **Description:** Deletes an order by ID.
Response:
204 No Content if the deletion is successful.
Errors:
404 Not Found if the order does not exist.
### 4. Get All Orders
- **Endpoint:** GET /orders
- **Description:** Retrieves all orders.
Response:
200 OK with a list of orders.
Example:

[
  {
    "id": 1,
    "productId": 1,
    "quantity": 2,
    "totalPrice": 200
  }
]


# Notes
Ensure that your API server is running and accessible at the specified base URL before making requests.
The endpoints provided are subject to change as the application evolves.
You can use tools like Postman or cURL to test these APIs.

## Running the Application
# Build the Docker Images
To build the Docker images for both the server and client  applications, run:

docker-compose build

# Start the Services
To launch the services, use Docker Compose:

docker-compose up

# for both at same time 
docker-compose up --build
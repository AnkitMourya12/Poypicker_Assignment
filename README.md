# Full-Stack Project Backend API

This is the backend API for the Full-Stack Project. It provides various endpoints for managing authentication, user roles, products, and requests. The backend is built using Node.js, Express, and MongoDB.

## **Table of Contents**

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Dashboard](#dashboard)
  - [Products](#products)
  - [Requests](#requests)
  - [Profile](#profile)
- [Testing with Postman](#testing-with-postman)

## **Setup Instructions**

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd backend
   
2. **Install dependencies:**

   ```bash
   npm install
   
2. **Install dependencies:** Create a .env file in the root directory and add the necessary environment variables as described below.

3. **Run the server::**

   ```bash
   npm start
  The server will run on the port specified in the .env file or 5000 by default.

  ## **Environment Variables::**
  Ensure you have the following variables in your .env file:

       MONGO_URI=<Your MongoDB URI>
       JWT_SECRET=<Your JWT Secret>
       PORT=<Port Number (optional)>
       
  ## **API Endpoints**

   1. **Authentication**
     **Register User**
       - Endpoint: POST /api/auth/register
       - Description: Registers a new user (Admin or Team Member).
       - Request Body:
         ```json
              {
              "name": "John Doe",
              "email": "john.doe@example.com",
               "password": "yourpassword",
              "role": "admin" // or "team_member"
               }

      **Login User**

**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticates a user and returns a JWT token.  
**Request Body:**
          ```
              {
               "email": "john.doe@example.com",
               "password": "yourpassword"
              }
              
 ##  Dashboard
    Get Dashboard Data
     Endpoint: GET /api/dashboard
    Description: Retrieves dashboard data for Admin or Team Member. Requires JWT token.
    Headers: x-auth-token: <JWT_TOKEN>
## Products
  ## Create Product
    Endpoint: POST /api/products
    Description: Creates a new product (Admin only).
    Request Body
    {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100
    }

  - Headers: x-auth-token: <JWT_TOKEN>
- Get All Products
  - Endpoint: GET /api/products
  - Description: Retrieves all products (Admin and Team Member).
  - Headers: x-auth-token: <JWT_TOKEN>
- Get Product by ID
   - Endpoint: GET /api/products/:product_id
   - Description: Retrieves a specific product by its ID.
   - Headers: x-auth-token: <JWT_TOKEN>

## Requests
  ## Create Request
    Endpoint: POST /api/requests
    Description: Creates a new request for a product (Team Member only).
    Request Body
    {
    "productId": "<Product ID>",
    "changes": "Requested changes description"
    }
- Headers: x-auth-token: <JWT_TOKEN>

- Get All Pending Requests

    - Endpoint: GET /api/requests/pending
    - Description: Retrieves all pending requests (Admin only).
    - Headers: x-auth-token: <JWT_TOKEN>
- Approve or Reject Request

   - Endpoint: PUT /api/requests/:request_id/status
   - Description: Approves or rejects a request (Admin only).
   - Request Body:
     
           {
            "status": "approved" // or "rejected"
             }
   - Headers: x-auth-token: <JWT_TOKEN>

## Profile
   ## Get User Profile

  - Endpoint: GET /api/profile
  - Description: Retrieves the profile of the authenticated user.
  - Headers: x-auth-token: <JWT_TOKEN>

- Get User Submissions (Team Member Only)

- Endpoint: GET /api/profile/my-submissions
- Description: Retrieves submissions made by the logged-in team member.
- Headers: x-auth-token: <JWT_TOKEN>

6. ## Notifications
   ## Get Notifications

- Endpoint: GET /api/notifications
- Description: Retrieves notifications for the logged-in user.
- Headers: x-auth-token: <JWT_TOKEN>
- Mark Notification as Read

- Endpoint: PUT /api/notifications/:id/read
- Description: Marks a specific notification as read.
- Headers: x-auth-token: <JWT_TOKEN>

## Testing with Postman
- Import the API endpoints collection into Postman.
- Set the x-auth-token header for authenticated requests.
- Test each endpoint with valid and invalid data to ensure all routes are functioning as expected.
## Notes
- Ensure the backend server is running before testing the endpoints.
- Always use the correct role-based JWT token to test protected routes.

## Postman all Endpoint testing you access
     https://api.postman.com/collections/34502776-e9e7c071-2017-498f-8ac6-05b1fe1e8ee7?access_key=<api-key> // contact me for access
## Conclusion
This backend provides robust APIs for managing users, products, requests, and notifications. Ensure to test all endpoints thoroughly using Postman and handle any errors appropriately.
  
    

    

         
  
  
  
   

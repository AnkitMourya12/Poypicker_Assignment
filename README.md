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

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}

    

         
  
  
  
   

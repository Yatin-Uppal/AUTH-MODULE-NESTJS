
 This project is built using NestJS and MongoDB, and it provides the following endpoints for user authentication and management:

Endpoints
1. User Registration (Sign Up)
Endpoint: /auth/signUp
Method: POST
Description: Register a new user.
Request Body:

{
    "name" : "",
    "email" : "",
    "password" : ""
}


2. User Login
Endpoint: /auth/login
Method: POST
Description: Log in an existing user.
Request Body:

{
  "email": "",
  "password": ""
}


3. Reset Password
Endpoint: auth/changePassword
Method: POST
Description: Reset the password for a user account.
Request Body:

{"email" : "",
    "currentPassword" : "",
    "newPassword" : ""}

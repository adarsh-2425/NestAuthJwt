# NestAuthJwt

This is a nestjs app which focuses on Authentication and Authorization using JWT. Database is implemented using MongoDB.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- NestJS

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/adarsh-2425/NestAuthJwt.git
   cd NestAuthJwt
   ```
2. Install dependencies:
    ```shell
    npm i
    ```

3. Configure your MongoDB connection in src/config/keys.ts.

4. Start the server
    ```shell
    npm start
    ```


## API Endpoints

### Get All Users
- URL: /users
- Method: GET
- Description: Get a list of all users.
- Response: JSON array of users.

### Get User by ID
- URL: /users/:id
- Method: GET
- Description: Get a specific user by ID.
- Response: JSON object of the user.
### Create an User
- URL: /users
- Method: POST
- Description: Create a new user.
- Request Body: JSON object with user details.
- Response: JSON object of the created user.
### Update an User
- URL: /users/:id
- Method: PUT
- Description: Update a specific user by ID.
- Request Body: JSON object with updated user details.
- Response: JSON object of the updated user.
### Delete an User
- URL: /users/:id
- Method: DELETE
- Description: Delete a specific user by ID.
- Response: JSON object with deleted user object.

## Contributing
If you would like to contribute to this project, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License
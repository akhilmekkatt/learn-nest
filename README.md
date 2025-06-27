# NestJS MySQL Users API

This is a NestJS application that provides a RESTful API to manage users in a MariaDB database. The API includes endpoints to list, create, and delete users, with input validation and basic error handling.

## Overview

- **Framework**: NestJS
- **Database**: MariaDB (using TypeORM with `mysql2` driver)
- **Features**:
  - Retrieve all users (`GET /users/getAllUsers`)
  - Create a new user (`POST /users/addUser`)
  - Delete a user by ID (`DELETE /users/deleteUser/:id`)
- **Validation**: Uses `class-validator` for input validation
- **Environment**: Developed and tested as of June 28, 2025

## Prerequisites

- Node.js (v18 or later)
- MariaDB server running
- npm or yarn package manager

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Database**:
   - Create a database named `test` in MariaDB.
   - Update `src/app.module.ts` with your MariaDB credentials:
     ```typescript
     TypeOrmModule.forRoot({
       type: 'mysql',
       host: 'localhost',
       port: 3306,
       username: 'your_username',
       password: 'your_password',
       database: 'test',
       entities: [User],
       synchronize: true, // Set to false in production
       autoLoadEntities: true,
     });
     ```
   - Ensure the `USER` table exists with columns `id`, `name`, `email`, and `created_at`. The `synchronize: true` option will create it if missing.

4. **Run the Application**:
   ```bash
   npm run start:dev
   ```
   The app will start on `http://localhost:3000`.

## API Endpoints

### 1. GET /users/getAllUsers

- **Description**: Retrieve all users from the database.
- **Method**: GET
- **URL**: `http://localhost:3000/users/getAllUsers`
- **Request Body**: None
- **Response** (HTTP 200):
  ```json
  [
    {
      "id": 1,
      "name": "John",
      "email": "john@example.com",
      "createdAt": "2025-06-27T22:47:48.000Z"
    }
  ]
  ```

### 2. POST /users/addUser

- **Description**: Create a new user.
- **Method**: POST
- **URL**: `http://localhost:3000/users/addUser`
- **Request Body**:
  ```json
  {
    "name": "Bob Wilson",
    "email": "bob.wilson@example.com"
  }
  ```
- **Response** (HTTP 201):
  ```json
  {
    "id": 11,
    "name": "Bob Wilson",
    "email": "bob.wilson@example.com",
    "createdAt": "2025-06-28T00:22:00.000Z"
  }
  ```
- **Error Response** (HTTP 409 - Duplicate Email):
  ```json
  {
    "statusCode": 409,
    "message": "Email already exists",
    "error": "Conflict"
  }
  ```
- **Error Response** (HTTP 400 - Validation Error):
  ```json
  {
    "statusCode": 400,
    "message": ["name should not be empty"],
    "error": "Bad Request"
  }
  ```

### 3. DELETE /users/deleteUser/:id

- **Description**: Delete a user by ID.
- **Method**: DELETE
- **URL**: `http://localhost:3000/users/deleteUser/1`
- **Request Body**: None
- **Response** (HTTP 204): No content
- **Error Response** (HTTP 404 - User Not Found):
  ```json
  {
    "statusCode": 404,
    "message": "User not found",
    "error": "Not Found"
  }
  ```
- **Error Response** (HTTP 400 - Invalid ID):
  ```json
  {
    "statusCode": 400,
    "message": "Validation failed (numeric string is expected)",
    "error": "Bad Request"
  }
  ```

## Usage Examples

### Using curl

- **Get All Users**:
  ```bash
  curl http://localhost:3000/users/getAllUsers
  ```
- **Create User**:
  ```bash
  curl -X POST http://localhost:3000/users/addUser \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Wilson","email":"bob.wilson@example.com"}'
  ```
- **Delete User**:
  ```bash
  curl -X DELETE http://localhost:3000/users/deleteUser/1
  ```

### Using Postman

1. Set the method and URL as described above.
2. For POST, add the `Content-Type: application/json` header and the request body.
3. Send the request and verify the response.

### Using JavaScript (fetch)

```javascript
// Get All Users
fetch('http://localhost:3000/users/getAllUsers')
  .then((response) => response.json())
  .then((data) => console.log(data));

// Create User
fetch('http://localhost:3000/users/addUser', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bob Wilson', email: 'bob.wilson@example.com' }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// Delete User
fetch('http://localhost:3000/users/deleteUser/1', { method: 'DELETE' })
  .then((response) => console.log('User deleted'))
  .catch((error) => console.error(error));
```

## Database Setup

- The `USER` table should have the following structure:
  ```sql
  CREATE TABLE USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL
  );
  ```
- To clean up invalid data (e.g., empty `name` or `email`):
  ```sql
  DELETE FROM USER WHERE id = 10;
  ALTER TABLE USER
  MODIFY COLUMN email VARCHAR(255) NOT NULL,
  MODIFY COLUMN name VARCHAR(255) NOT NULL;
  ```

## Configuration

- **TypeScript**: Ensure `tsconfig.json` includes:
  ```json
  {
    "compilerOptions": {
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "skipLibCheck": true
    }
  }
  ```
- **Environment Variables**: For production, use a `.env` file with `@nestjs/config` to manage database credentials.

## Notes

- **Development Mode**: `synchronize: true` in `app.module.ts` auto-creates the table. Disable it in production and use migrations.
- **Validation**: The `ValidationPipe` enforces `CreateUserDto` rules (non-empty `name` and valid `email`).
- **Debugging**: Check server logs with `DEBUG=express:* npm run start:dev` for request details.
- **Production**: Use environment variables and disable `synchronize` for schema management.

## Contributing

Feel free to submit issues or pull requests on the repository.

## License

MIT License (or specify your preferred license).

# FNet Payment System: THIS IS NOT USABLE DESCRIPTION AND IS ONLY FOR TEST PURPOSE

FNet Payment System is a TypeScript-based payment system that allows users to make payments and keep track of their transaction history. It uses MySQL as its database engine and provides a simple API for interacting with the system.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository: git clone https://github.com/RubenAvetisyan/FNet-Payment-System.git

2. Install dependencies: npm install

3. Create a MySQL database and a user with full privileges on that database.

4. Edit the `config.ts` file with your database details.

### Usage

To start the server, run the following command: npm start

The server will start on port `3000` by default. You can change this by setting the `PORT` environment variable.

The API documentation can be found at `http://localhost:3000/docs`.

## Database Schema

The database schema consists of two tables:

### transactions
```
This table stores information about each transaction, including the amount, date, and user ID.
CREATE TABLE transactions (
id INT NOT NULL AUTO_INCREMENT,
amount DECIMAL(10,2) NOT NULL,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id)
);
```
### users

This table stores information about each user, including their name and email address.
```
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
PRIMARY KEY (id),
UNIQUE KEY (email)
);
```

## API

### POST /api/users

Create a new user.

#### Request
```
POST /api/users
Content-Type: application/json

{
"name": "John Doe",
"email": "johndoe@example.com"
}
```

#### Response
```
HTTP/1.1 201 Created
Content-Type: application/json

{
"id": 1,
"name": "John Doe",
"email": "johndoe@example.com",
"balance": "0.00"
}
```

### GET /api/users/:id

Get user details.

#### Request
```
HTTP/1.1 200 OK
Content-Type: application/json

{
"id": 1,
"name": "John Doe",
"email": "johndoe@example.com",
"balance": "0.00"
}
```
### POST /api/transactions

Create a new transaction.

#### Request
```
POST /api/transactions
Content-Type: application/json

{
"amount": 10.00,
"user_id": 1
}
```
#### Response
```
HTTP/1.1 201 Created
Content-Type: application/json

{
"id": 1,
"amount": "10.00",
"date": "2023-03-27T16:04:42.000Z",
"user_id": 1
}
```
### GET /api/transactions

Get transaction history.

#### Request
```
GET /api/transactions
```
#### Response
```
HTTP/1 1.1 200 OK
Content-Type: application/json

[
{
"id": 1,
"amount": "10.00",
"date": "2023-03-27T16:04:42.000Z",
"user_id": 1
},
{
"id": 2,
"amount": "5.00",
"date": "2023-03-27T16:05:12.000Z",
"user_id": 1
}
]
```
### PATCH /api/users/:id/balance
```
Update user balance.
```
#### Request
```
PATCH /api/users/1/balance
Content-Type: application/json

{
"balance": 10.00
}

shell
Copy code
```
#### Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
"id": 1,
"name": "John Doe",
"email": "johndoe@example.com",
"balance": "10.00"
}

shell
Copy code
```
### DELETE /api/transactions/:id
```
Delete a transaction.
```
#### Request
```
DELETE /api/transactions/1

shell
Copy code
```
#### Response
```
HTTP/1.1 204 No Content

csharp
Copy code
```
## License

This project is licensed under the MIT License.

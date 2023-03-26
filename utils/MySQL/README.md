# FNet Payment System - MySQL Connection Class

This repository contains the `Connection` class, which is used to establish and manage connections to a MySQL database in the FNet Payment System.

## Installation

To use the `Connection` class, you must first install the `mysql2` package using npm:

```bash
npm install mysql2
Usage
To use the Connection class, you must first create an instance of it, passing in the required configuration options:

typescript
Copy code
import { Connection } from './connection-class';

const connection = new Connection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fnet_payment_system',
});
Once you have a Connection instance, you can use it to execute queries on the database:

typescript
Copy code
await connection.query('SELECT * FROM users');
You can also use the beginTransaction, commit, and rollback methods to manage transactions:

typescript
Copy code
await connection.beginTransaction();
try {
  // Execute queries here
  await connection.commit();
} catch (err) {
  await connection.rollback();
}
API
new Connection(options)
Creates a new Connection instance.

Options
host: The MySQL server hostname.
port: The MySQL server port (default: 3306).
user: The MySQL user to authenticate as.
password: The password of that MySQL user.
database: Name of the database to use for this connection.
query(sql, values)
Executes a SQL query on the database.

sql: The SQL query to execute.
values: An optional array of values to replace placeholders in the SQL query.
beginTransaction()
Starts a transaction on the database.

commit()
Commits the current transaction on the database.

rollback()
Rolls back the current transaction on the database.

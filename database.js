const mysql = require("mysql2");

class MySQLConnection {
  constructor() {
    this.createNewConnection();
  }

  createNewConnection() {
    try {
      this.pool = mysql
        .createPool({
          host: process.env.HOST,
          user: process.env.USER,
          password: process.env.PASSWORD,
          database: process.env.DATABASE_NAME,
        })
        .promise();
    } catch (err) {
      console.log("Error creating MySQL connection pool:", error);
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MySQLConnection();
    }
    return this.instance;
  }

  getPool() {
    return this.pool;
  }
}

module.exports = MySQLConnection.getInstance().getPool();

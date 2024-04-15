export const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20),
    dob DATETIME,
    gender ENUM('m', 'f', 'o'),
    address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

export const CREATE_USER = `
    INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

export const FIND_USER_WITH_EMAIL = `
    SELECT * FROM user WHERE email = ?
`;

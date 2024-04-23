export const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(500),
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

export const GET_ALL_USERS = `
    SELECT id, first_name, last_name, email, phone, dob, address, created_at FROM user LIMIT ?, ?
`;

export const GET_USER_BY_ID_QUERY = `
  SELECT id, first_name, last_name, email, phone, dob, address FROM user WHERE id = ?;
`;

export const UPDATE_USER_QUERY = `
  UPDATE user
  SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?
  WHERE id = ?;
`;

export const DELETE_USER_BY_ID_QUERY = `
  DELETE FROM user WHERE id = ?;
`;

export const CREATE_USER_RECORD = `
    INSERT INTO user (first_name, last_name, email, phone, dob, gender, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

export const SELECT_TOTAL_USERS = `
  SELECT COUNT(*) AS totalCount FROM user;
`;

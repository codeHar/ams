export const CREATE_ARTIST_TABLE = `CREATE TABLE IF NOT EXISTS artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    dob DATETIME,
    gender ENUM('m', 'f', 'o'),
    address VARCHAR(255),
    first_release_year YEAR,
    no_of_albums_released INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

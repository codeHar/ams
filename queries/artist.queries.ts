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

export const GET_ALL_ARTISTS = `
    SELECT id,name, dob, address, first_release_year, no_of_albums_released, created_at FROM artist LIMIT ?, ?
`;

export const CREATE_ARTIST = `
  INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released)
  VALUES (?, ?, ?, ?, ?, ?)
`;

export const GET_ARTIST_BY_ID_QUERY = `
  SELECT * FROM artist WHERE id = ?;
`;

export const UPDATE_ARTIST_QUERY = `
  UPDATE artist
  SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?
  WHERE id = ?;
`;

export const DELETE_ARTIST_BY_ID_QUERY = `
  DELETE FROM artist WHERE id = ?;
`;

export const SELECT_MUSIC_BY_ARTIST = `
  SELECT id, title, album_name, genre, created_at FROM music WHERE artist_id = ?;
`;

export const SELECT_TOTAL_ARTISTS = `
  SELECT COUNT(*) AS totalCount FROM artist;
`;

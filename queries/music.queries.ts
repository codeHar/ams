export const CREATE_MUSIC_TABLE = `CREATE TABLE IF NOT EXISTS music (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255),
    genre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artist(id)
);`;

export const INSERT_MUSIC = `
    INSERT INTO music (artist_id, title, album_name, genre)
    VALUES (?, ?, ?, ?);
`;

export const SELECT_MUSIC_BY_ARTIST = `
  SELECT * FROM music WHERE artist_id = ?;
`;

export const SELECT_MUSIC = `
  SELECT * FROM music WHERE id = ?;
`;

export const UPDATE_MUSIC_QUERY = `
  UPDATE music
  SET title = ?, album_name = ?, genre = ?
  WHERE id = ?;
`;

export const DELETE_MUSIC_BY_ID_QUERY = `
  DELETE FROM music WHERE id = ?;
`;

export const SELECT_TOTAL_MUSICS_BY_ARTIST = `
  SELECT COUNT(*) AS totalCount FROM music WHERE artist_id = ?;
`;

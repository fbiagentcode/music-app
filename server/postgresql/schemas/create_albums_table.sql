DROP TABLE IF EXISTS albums CASCADE;

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    genre VARCHAR(255),
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE SET NULL
);

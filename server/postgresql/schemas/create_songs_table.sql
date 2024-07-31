-- Assuming the 'artists' and 'albums' tables already exist

DROP TABLE IF EXISTS songs CASCADE;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,          -- Unique identifier for the song
    title VARCHAR(255) NOT NULL,   -- Title of the song
    duration INTEGER,              -- Duration of the song in seconds
    release_date DATE,             -- Release date of the song
    genre VARCHAR(255),            -- Genre of the song
    album_id INTEGER,              -- Foreign key referencing the 'albums' table
    artist_id INTEGER,             -- Foreign key referencing the 'artists' table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE SET NULL
);

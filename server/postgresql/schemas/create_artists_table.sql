-- Drop the table if it exists to recreate it
DROP TABLE IF EXISTS artists CASCADE;

-- Create the artists table with the updated schema
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,              -- Unique identifier for each artist
    name VARCHAR(255) NOT NULL,        -- Name of the artist or band
    image_url VARCHAR(255),            -- URL of the artist's image
    twitter VARCHAR(255),              -- Twitter handle of the artist
    instagram VARCHAR(255),            -- Instagram handle of the artist
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

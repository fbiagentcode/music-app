DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    image_url TEXT,
    email_verified BOOLEAN,
    role VARCHAR,
    auth_time TIMESTAMP,
    favourites TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phone_number VARCHAR,
    address TEXT
);

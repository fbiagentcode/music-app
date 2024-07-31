const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { pool } = require("./db");

app.use(cors({ origin: true }));
app.use(express.json());

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

// Connect to PostgreSQL
pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch(err => console.error('Connection error', err.stack));

// Start the server
app.listen(4000, () => console.log("Listening on port 4000"));

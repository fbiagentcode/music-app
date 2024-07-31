const express = require('express');
const router = express.Router();
const admin = require("../../config/firebase.config");
const { pool } = require('../db'); // Assuming you have a db.js file exporting the pool



// User login route
router.get('/login', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    const userExists = await pool.query('SELECT * FROM users WHERE id = $1', [decodeValue.user_id]);
    if (userExists.rows.length === 0) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

// Add song to favourites
router.put('/favourites/:userId', async (req, res) => {
  const userId = req.params.userId;
  const songId = req.query.songId;

  try {
    const result = await pool.query(
      'UPDATE users SET favourites = array_append(favourites, $1) WHERE id = $2',
      [songId, userId]
    );
    res.status(200).send({ success: true, msg: "Song added to favourites" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

// Get all users
router.get('/getUsers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at ASC');
    if(result.rows.length)
        return res.status(200).send({ success: true, data: result.rows });
    res.status(200).send({ success: true, msg: 'No Data Found' });
  } catch (error) {
    res.status(500).send({ success: false, msg: "No Data Found" });
  }
});

// Get one user by ID
router.get('/getUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      res.status(200).send({ success: true, data: result.rows[0] });
    } else {
      res.status(200).send({ success: false, data: null });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Update user role
router.put('/updateRole/:userId', async (req, res) => {
  const userId = req.params.userId;
  const role = req.body.data.role;

  try {
    const result = await pool.query(
        `INSERT INTO users (id, role) 
        VALUES ($1, $2) 
        ON CONFLICT (id) 
        DO UPDATE SET role = EXCLUDED.role 
        RETURNING *`,
      [role, userId]
    );
    res.status(200).send({ success: true, user: result.rows[0] });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

// Delete user
router.delete('/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    if (result.rowCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(404).send({ success: false, msg: "Data Not Found" });
    }
  } catch (error) {
    //left error mesg
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Remove song from favourites
router.put('/removeFavourites/:userId', async (req, res) => {
  const userId = req.params.userId;
  const songId = req.query.songId;

  try {
    const result = await pool.query(
      'UPDATE users SET favourites = array_remove(favourites, $1) WHERE id = $2',
      [songId, userId]
    );
    res.status(200).send({ success: true, msg: "Song removed from favourites" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = {
    name: decodeValue.name,
    email: decodeValue.email,
    image_url: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: 'member',
    auth_time: decodeValue.auth_time,
  };
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, image_url, id, email_verified, role, auth_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [newUser.name, newUser.email, newUser.image_url, newUser.user_id, newUser.email_verified, newUser.role, newUser.auth_time]
    );
    res.status(200).send({ user: result.rows[0] });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  try {
    const result = await pool.query(
      'UPDATE users SET auth_time = $1 WHERE id = $2 RETURNING *',
      [decodeValue.auth_time, decodeValue.user_id]
    );
    res.status(200).send({ user: result.rows[0] });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
};

module.exports = router;

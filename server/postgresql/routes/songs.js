// songRouter.js
const express = require('express');
const { pool } = require('../db'); // Assuming you have a db.js file exporting the pool

const router = express.Router();

router.get('/getAll', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM songs ORDER BY created_at ASC');
    if (result.rows.length) {
      res.status(200).send({ success: true, data: result.rows });
    } else {
      res.status(200).send({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get('/getOne/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
    if (result.rows.length) {
      res.status(200).send({ success: true, data: result.rows[0] });
    } else {
      res.status(200).send({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.post('/save', async (req, res) => {
  const { title, duration, release_date, genre, album_id, artist_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO songs (title, duration, release_date, genre, album_id, artist_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [title, duration, release_date, genre, album_id, artist_id]
    );
    res.status(200).send({ song: result.rows[0] });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, duration, release_date, genre, album_id, artist_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO songs (id, title, duration, release_date, genre, album_id, artist_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       ON CONFLICT (id) 
       DO UPDATE SET 
         title = EXCLUDED.title,
         duration = EXCLUDED.duration,
         release_date = EXCLUDED.release_date,
         genre = EXCLUDED.genre,
         album_id = EXCLUDED.album_id,
         artist_id = EXCLUDED.artist_id
       RETURNING *`,
      [title, duration, release_date, genre, album_id, artist_id, id]
    );
    if (result.rows.length) {
      res.status(200).send({ song: result.rows[0] });
    } else {
      res.status(200).send({ msg: null });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM songs WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 1) {
      res.status(200).send({ success: true, msg: 'Data Deleted' });
    } else {
      res.status(200).send({ success: false, msg: 'Data Not Found' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get('/getFavouritesSongs', async (req, res) => {
  const query = req.query.songId;
  res.send(query);
});

module.exports = router;

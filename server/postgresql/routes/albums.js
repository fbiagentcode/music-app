const {pool} = require('../db');  // Assuming you've configured your PostgreSQL connection in a 'db.js' file
const express = require('express');
const router = express.Router();

router.get('/getAll', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM albums ORDER BY created_at ASC');
    if(result.rows.length)
      return res.status(200).send({ success: true, data: result.rows });
    res.status(200).send({ success: true, msg: "No Data Found" });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.get('/getOne/:id', async (req, res) => {
  const albumId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM albums WHERE id = $1', [albumId]);
    if (result.rows.length) {
      res.status(200).send({ success: true, data: result.rows[0] });
    } else {
      res.status(200).send({ success: false, msg: 'No Data Found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.post('/save', async (req, res) => {
  const { name, imageURL } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO albums (name, imageURL)
       VALUES ($1, $2)
       RETURNING *`,
      [name, imageURL]
    );
    res.status(201).send({ success: true, album: result.rows[0] });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const albumId = req.params.id;
  const { name, imageURL } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO albums (id, name, imageURL)
       VALUES ($1, $2, $3)
       ON CONFLICT (id)
       DO UPDATE SET
         name = EXCLUDED.name,
         imageURL = EXCLUDED.imageURL
       RETURNING *`,
      [albumId, name, imageURL]
    );
    res.status(200).send({ success: true, album: result.rows[0] });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const albumId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM albums WHERE id = $1', [albumId]);
    if (result.rowCount) {
      res.status(200).send({ success: true, msg: 'Data Deleted' });
    } else {
      res.status(200).send({ success: false, msg: 'Data Not Found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

module.exports = router;

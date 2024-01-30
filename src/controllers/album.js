const db = require("../db/index.js");

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const artistId = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query(
      "INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *",
      [name, year, artistId]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbums = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Albums");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum, readAlbums };

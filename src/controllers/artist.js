const createArtist = (req, res) => {
  res.status(201).json({ message: "Artist created successfully" });
};

module.exports = createArtist;

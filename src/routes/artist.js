const express = require("express");
const artistController = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/artists", artistController.createArtist);
artistRouter.get("/artists", artistController.readArtists);
artistRouter.get("/artists/:id", artistController.getArtistById);
artistRouter.put("/artists/:id", artistController.putArtist);
artistRouter.delete("/artists/:id", artistController.deleteArtist);

module.exports = artistRouter;

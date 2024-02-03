const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Delete Album", () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      ["Black Sabbath", "Rock"]
    );

    artist = rows[0];

    const albumData = await db.query(
      "INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *",
      ["Masters of Reality", 1971, artist.id]
    );

    album = albumData.rows[0];
  });

  describe("DELETE /albums/{id}", () => {
    it("deletes the album and returns the deleted data", async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "Masters of Reality",
        year: 1971,
        artistid: artist.id,
      });
    });
    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .delete("/albums/111111111")
        .send({ name: "Masters of Reality", year: 1971 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 111111111 does not exist");
    });
  });
});

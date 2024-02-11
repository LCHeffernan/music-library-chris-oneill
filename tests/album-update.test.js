const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Update Album", () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      ["Led Zeppelin", "rock"]
    );

    artist = rows[0];

    const albumData = await db.query(
      "INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *",
      ["Led Zeppelin 4", 1971, artist.id]
    );

    album = albumData.rows[0];
  });

  // describe("PUT /albums/{id}", () => {
  //   it("updates the album and returns the updated record", async () => {
  //     const { status, body } = await request(app)
  //       .put(`/albums/${album.id}`)
  //       .send({ name: "something different", year: "1900" });

  //     expect(status).to.equal(200);
  //     expect(body).to.deep.equal({
  //       id: album.id,
  //       name: "something different",
  //       year: "1900",
  //     });
  //   });

  //   it("returns a 404 if the album does not exist", async () => {
  //     const { status, body } = await request(app)
  //       .put("/albums/111111111")
  //       .send({ name: "something different", year: "1900" });

  //     expect(status).to.equal(404);
  //     expect(body.message).to.equal("album 111111111 does not exist");
  //   });
  // });

  describe("PATCH /albums/{id}", () => {
    it("updates the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({
          name: "Led Zeppelin 2",
          year: 1968,
        });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: "Led Zeppelin 2",
        year: 1968,
        artistid: artist.id,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .patch("/albums/111111111")
        .send({ name: "Led Zeppelin 2", year: 1968 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 111111111 does not exist");
    });
  });
});

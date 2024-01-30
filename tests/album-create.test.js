const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Create Album", () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      ["Pantera", "Metal"]
    );
    artist = rows[0];
  });
  describe("POST /artists/:id/albums", () => {
    it("Creates a new album for a specific artist", async () => {
      const id = artist.id;
      const { status, body } = await request(app)
        .post(`/artists/${id}/albums`)
        .send({
          name: "Far Beyond Driven",
          year: "1994",
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal("Far Beyond Driven");
      expect(body.year).to.equal(1994);

      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
      expect(artistData.name).to.equal("Far Beyond Driven");
      expect(artistData.year).to.equal(1994);
      expect(artistData.artistid).to.equal(id);
    });
  });
});

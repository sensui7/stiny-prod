const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");
const handler = sinon.spy();

describe("Photos", () => {
  describe("Routes", () => {
    // Mocking path is relative to the testing folder.
    mock("../routes/photoHandler", handler);
    const app = require("../app");

    describe("/createAlbum", () => {
      it("should return 302 and hits the correct path", () => {
        request(app)
          .post("/createAlbum")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/createAlbum");
            if (err) {
              throw err;
            }
          });
      });
    });

    describe("/addPhoto", () => {
      it("should return 302 and hits the correct path", (done) => {
        mock("../routes/photoHandler", handler);
        const app = require("../app");

        request(app)
          .post("/addPhoto")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/addPhoto");

            if (err) {
              throw err;
            }

            done();
          });
      });
    });

	describe("/albums", () => {
	  it("should return 302 and hits the correct path", () => {
        mock("../routes/photoHandler", handler);
        const app = require("../app");

        request(app)
          .get("/albums")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/albums");

            if (err) {
              throw err;
            }
          });
	  });
	});

	describe("/albumPhotos", () => {
	  it("should return 302 and hits the correct path", () => {
        mock("../routes/photoHandler", handler);
        const app = require("../app");

        request(app)
          .get("/albumPhotos")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/albumPhotos");

            if (err) {
              throw err;
            }
          });
	  });
	});

	describe("/deletePhoto", () => {
	  it("should return 302 and hits the correct path", () => {
        mock("../routes/photoHandler", handler);
        const app = require("../app");

        request(app)
          .post("/deletePhoto")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/deletePhoto");

            if (err) {
              throw err;
            }
          });
	  });
	});
  });
});


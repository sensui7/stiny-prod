const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");
const handler = sinon.spy();
const cookingHandler = sinon.spy();

describe("Photos", () => {

  describe("Routes", () => {
    // Mocking path is relative to the testing folder.
    const app = require("../app");

    describe("/createAlbum", () => {
      it("should return 302 and hits the correct path", () => {
		mock("../routes/cookingHandler", cookingHandler);
		mock("../routes/photoHandler", handler);
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

    describe("/deleteAlbum", () => {
      it("should return 302 and hits the correct path", () => {
		mock("../routes/cookingHandler", cookingHandler);
		mock("../routes/photoHandler", handler);
        request(app)
          .post("/deleteAlbum")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/deleteAlbum");
            if (err) {
              throw err;
            }
          });
      });
    });

    describe("/editAlbum", () => {
      it("should return 302 and hits the correct path", () => {
		mock("../routes/cookingHandler", cookingHandler);
		mock("../routes/photoHandler", handler);
        request(app)
          .post("/editAlbum")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/editAlbum");
            if (err) {
              throw err;
            }
          });
      });
    });

    describe("/addPhoto", () => {
      it("should return 302 and hits the correct path", (done) => {
		mock("../routes/cookingHandler", cookingHandler);
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
		mock("../routes/cookingHandler", cookingHandler);
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
		mock("../routes/cookingHandler", cookingHandler);
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

    describe("/editPhoto", () => {
      it("should return 302 and hits the correct path", () => {
		mock("../routes/cookingHandler", cookingHandler);
		mock("../routes/photoHandler", handler);
        request(app)
          .post("/editPhoto")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/editPhoto");
            if (err) {
              throw err;
            }
          });
      });
    });

	describe("/deletePhoto", () => {
	  it("should return 302 and hits the correct path", () => {
		mock("../routes/cookingHandler", cookingHandler);
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

const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");
const cookingHandler = sinon.spy();
const photoHandler = sinon.spy();

after(() => {
  mock.stopAll();
});

describe("Recipes", () => {
  before(() => {
    mock("../routes/photoHandler", photoHandler);
    mock("../routes/cookingHandler", cookingHandler);
  });

  describe("Routes", () => {
    // Mocking path is relative to the testing folder.
    const app = require("../app");

    describe("/addRecipe", () => {
      it("should return 302 and hits the correct path", () => {
        request(app)
          .post("/addRecipe")
          .send({})
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/addRecipe");
            if (err) {
              throw err;
            }
          });
      });
    });

    describe("/getAllRecipes", () => {
      it("should return 302 and hits the correct path", () => {
        request(app)
          .get("/getAllRecipes")
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/getAllRecipes");
            if (err) {
              throw err;
            }
          });
      });
    });
  });
});

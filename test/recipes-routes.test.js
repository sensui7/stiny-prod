const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");
const databaseHandler = sinon.spy();
const cookingHandler = sinon.spy();
const photoHandler = sinon.spy();
let app = null;

before(() => {
  // Mocking path is relative to the testing folder.
  mock("../routes/photoHandler", photoHandler);
  mock("../routes/cookingHandler", cookingHandler);
  app = require("../app");
});

describe("Recipes", () => {
  describe("Routes", () => {

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

    describe("/deleteRecipe", () => {
      it("should return 302 and hits the correct path", () => {
        request(app)
          .get("/deleteRecipe")
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/deleteRecipe");
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

    describe("/updateRecipe", () => {
      it("should return 302 and hits the correct path", () => {
        request(app)
          .get("/updateRecipe")
          .expect(302)
          .end(function (err, res) {
            should(res.header.location).endWith("/updateRecipe");
            if (err) {
              throw err;
            }
          });
      });
    });
  });
});

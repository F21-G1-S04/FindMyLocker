let lockerController = require('./controller/locker');

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/locker", lockerController);

test("index route works", done => {
    request(app)
      .get("/locker")
      .expect(200, done);
  });
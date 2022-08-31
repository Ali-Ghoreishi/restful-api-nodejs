const app = require("../app");
const User = require("../models/User");
const request = require("supertest");
const { Types } = require("mongoose");

describe("api/users", () => {
  let person;
  let id;
  let myObj;

  const fill_user = async () => {
    // let time = new Date().getTime();
    const { fullname, email, password } = person;
    const user = await User.create({ fullname, email, password});
    const userId = user._id.toString();
    return userId;
  };

  beforeEach(() => {

    person = {
      fullname: "reza",
      email: "reza@gmail.com",
      password: "11111",
    };

    myObj = { fullname: "Mohammad" };
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /users/register", () => {
    const exec = async () => {
      return await request(app).post("/users/register").send(person);
    };

    test("should return 201 if user created", async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    test("should return 409 if user already exists", async () => {
      await fill_user();
      const res = await exec();
      expect(res.status).toBe(409);
    });

    test("should return 400 if user is invalid", async () => {
      person.fullname = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

  describe("GET /users/list", () => {
    const exec = async () => {
      return await request(app).get("/users/list");
    };

    test("should return 200 if the list of users received", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /users/:id", () => {
    const exec = async () => {
      return await request(app).delete(`/users/${id}`);
    };

    test("should return 200 if user deleted", async () => {
      id = await fill_user();
      const res = await exec();
      expect(res.status).toBe(200);
    });

    test("should return 404 if user does not exist", async () => {
      id = Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /users/:id", () => {
    const exec = async () => {
      return await request(app).put(`/users/${id}`).send(myObj);
    };

    test("should return 200 if user updated", async () => {
      id = await fill_user();
      const res = await exec();
      expect(res.status).toBe(200);
    });

    test("should return 404 if user does not exist", async () => {
      id = Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});

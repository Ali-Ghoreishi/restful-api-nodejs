const app = require("../app");
const User = require("../models/User");
const  request  = require("supertest");

describe("api/users", () => {
    let person ;

  const fill_user = async () => {
    const { fullname, email, password } = person
    await User.create(
      { fullname, email, password },
      function (err, user) {
        console.log(user);
      }
    );
  };

  beforeEach(() => {
    let time = new Date().getTime();
     person = {
      fullname: "reza",
      email: "reza@gmail.com",
      password: "11111",
    };
  });

  afterEach(async () => {
    await User.deleteMany({})
  });

  describe("POST /users/register", () => {
    const exec = async () => {
        return await request(app).post("/users/register").send(person)
    }

    test("should return 201 if user created", async () => {
        const res = await exec()
        expect(res.status).toBe(201)
    })

    test("should return 409 if user already exists", async () => {
        await fill_user();
        const res = await exec()
        expect(res.status).toBe(409)
    })

    test("should return 400 if user is invalid", async () => {
        person.fullname = "a"
        const res = await exec()
        expect(res.status).toBe(400)
    })
  })
});

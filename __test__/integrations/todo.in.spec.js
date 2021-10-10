const request = require("supertest");
const app = require("../../app");
const { connect, closed, itsOkMongo } = require("../../database");
const endPoint = "/todo";
const oneTodo = require("../mooks/oneTodo.json");
const allTodos = require("../mooks/allTodos.json");

// define the hook that is launched each test
beforeEach(() => {
  connect();
});

//
describe(`${endPoint} API `, () => {
  //   TEST GOOD:#1
  it(`GET ${endPoint} RETURN 200`, async () => {
    const response = await request(app)
      .get(endPoint)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toBeDefined();
  });
  // TEST GOOD:#2
  it(`POST ${endPoint} RETURN 201`, async () => {
    const response = await request(app)
      .post(endPoint)
      .send(oneTodo)
      .expect(201);
    expect(response.body.title).toBe(oneTodo.title);
    expect(response.body.done).toBe(oneTodo.done);
    expect(response.body).toMatchObject(oneTodo);
  });
});

afterAll(() => {
  closed();
});

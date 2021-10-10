const request = require("supertest");
const app = require("../../app");
const { connect, closed, itsOkMongo } = require("../../database");
const endPoint = "/todo";
const oneTodo = require("../mooks/oneTodo.json");
const allTodos = require("../mooks/allTodos.json");
const missingTodo = require("../mooks/missingTodo.json");

// define the hook that is launched each test 📸
beforeEach(() => {
  connect();
});

// TEST ALL ENDPOINT API 🩺
describe(`${endPoint} API `, () => {
  //   TEST GOOD:#1 💚
  it(`GET ALL ${endPoint} RETURN 200`, async () => {
    const response = await request(app)
      .get(endPoint)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toBeDefined();
  });
  // TEST GOOD:#2 💚
  it(`GET ONE ${endPoint} RETURN 203 AND TODO`, async () => {
    const response = await request(app)
      .get(`${endPoint}/616232ee991815ea70874878`)
      .expect(203);
    // expect(response.body).
  });
  // TEST GOOD:#2 💚
  it(`POST ${endPoint} RETURN 201`, async () => {
    const response = await request(app)
      .post(endPoint)
      .send(oneTodo)
      .expect(201);
    expect(response.body.title).toBe(oneTodo.title);
    expect(response.body.done).toBe(oneTodo.done);
    expect(response.body).toMatchObject(oneTodo);
  });
  // TEST BAD:#3 💔
  it(`POST ${endPoint} MISSING DATA`, async () => {
    const response = await request(app)
      .post(endPoint)
      .send(missingTodo)
      .expect(500);
  });
});

// CLOSED CONNECTION MONGO 🔐
afterAll(() => {
  closed();
});

const {
  getAll,
  postOne,
  getOne,
  deleteOne,
  updateOne,
} = require("../../controllers/todo.controller");
const newTodo = require("../mooks/oneTodo.json");
const httpMocks = require("node-mocks-http");
const TODO = require("../../database/models/todo.model");
// create def of variable
let req, res, next;

// mock querys function 📸;
TODO.find = jest.fn();
TODO.create = jest.fn();
TODO.findOne = jest.fn();
TODO.findOneAndDelete = jest.fn();
TODO.findByIdAndUpdate = jest.fn();

//hook triger befor all test 👀
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
  req.body = newTodo;
  req.params.id = "616232ee991815ea70874878";
});

// TEST ALL MIDDL IN TODO 🤪
describe("TODO CONTROLLERS", () => {
  // TEST GOOD:#1 💚
  it("should be function", () => {
    expect(typeof postOne).toBe("function");
  });
  // TEST GOOD:#2 💚
  it("should be function", () => {
    expect(typeof getOne).toBe("function");
  });
  // TEST GOOD:#3 💚
  it("should be function", () => {
    expect(typeof updateOne).toBe("function");
  });
  // TEST GOOD:#4 💚
  it("should be function", () => {
    expect(typeof deleteOne).toBe("function");
  });

  // TEST GOOD CREATE TODO:#5 💚
  it("should be insert data in SGBD", async () => {
    await postOne(req, res, next);
    expect(TODO.create).toBeCalledWith(newTodo);
  });

  // TEST GOOD GET ONE TODO:#6 💚
  it("should be call oneTodo with route parameters", async () => {
    await getOne(req, res, next);
    expect(TODO.findOne).toBeCalledWith({ _id: "616232ee991815ea70874878" });
  });

  // TEST GOOD GET ONE json and 200 TODO:#7 💚
  it("should be return json body and 200 status for oneTodo", async () => {
    TODO.findOne.mockReturnValue(newTodo);
    await getOne(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  // TEST GOOD RETURN ERROR IF DONT HAVE ID TODO:#8 💔
  it("should be return error message and 500 status for id not found to get todo", async () => {
    const errorMessage = { message: "error id not found" };
    const rejectedPromise = Promise.reject(errorMessage);
    TODO.findOne.mockReturnValue(rejectedPromise);
    await getOne(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  // TEST GOOD GET ONE json and 404 TODO:#9 💔
  it("should be return 404 status and error message", async () => {
    TODO.findOne.mockReturnValue(null);
    await getOne(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({
      error: { msg: "Impossible to return todo" },
    });
  });

  // TEST GOOD UPDATE ONE 201 TODO:#7 💚
  it("should be update todo", async () => {
    await updateOne(req, res, next);
    expect(TODO.findByIdAndUpdate).toHaveBeenCalledWith(
      "616232ee991815ea70874878",
      newTodo,
      {
        new: true,
        useFindAndModify: false,
      }
    );
  });
});

const { getAll, postOne } = require("../../controllers/todo.controller");
const oneTodo = require("../mooks/oneTodo.json");
const httpMocks = require("node-mocks-http");
let {
  findAll,
  insert,
  deleteOne,
  oneTodo,
} = require("../../querys/todo.query");

// create def of variable
let req, res, next;

// mock querys function 📸;
findAll = jest.fn();
insert = jest.fn();
deleteOne = jest.fn();
oneTodo = jest.fn();

//hook triger befor all test 👀
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
  req.body = oneTodo;
});

// TEST ALL MIDDL IN TODO 🤪
describe("TODO CONTROLLERS", () => {});

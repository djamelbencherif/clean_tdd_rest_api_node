const { findAll, insert, oneTodo, deleteOne } = require("../querys/todo.query");
const httpError = require("http-errors");
// def middl get all todos
exports.getAll = async (req, res, next) => {
  try {
    const todos = await findAll();
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(500).json({ error: "Impossible to recover the todos" });
    }
  } catch (error) {
    next(httpError(500, { msg: "Impossible to recover the todos" }));
  }
};

// def middl insert todo
exports.postOne = async (req, res, next) => {
  try {
    const data = req.body;
    const todo = await insert(data);
    if (todo) {
      res.status(201).json(todo);
    } else {
      res.status(500).json({ error: "Impossible to creta todo" });
    }
  } catch (error) {
    next(httpError(500, error));
  }
};

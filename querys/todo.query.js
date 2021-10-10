const Todo = require("../database/models/todo.model");

// return promise all todo
exports.findAll = () => {
  return Todo.find({}).exec();
};

// return data insert
exports.insert = (data) => {
  return Todo.create({ ...data });
};

// return promise one data get
exports.oneTodo = (_id) => {
  return Todo.findOne({ _id });
};

// delete one todo return promise
exports.deleteOne = (_id) => {
  return Todo.findOneAndDelete({ _id }).exec();
};

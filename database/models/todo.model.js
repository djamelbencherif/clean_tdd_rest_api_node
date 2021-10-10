const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaTodo = new Schema({
  title: { type: String, required: true },
  done: { type: Boolean, required: true },
});

const Todo = mongoose.model("todo", SchemaTodo);

module.exports = Todo;

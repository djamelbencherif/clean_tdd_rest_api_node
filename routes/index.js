const router = require("express").Router();
const {
  getAll,
  postOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/todo.controller");

// all routes for todos
router.get("/todo", getAll);
router.post("/todo", postOne);
router.get("/todo/:id", getOne);
router.put("/todo/:id", updateOne);
router.delete("/todo/:id", deleteOne);

module.exports = router;

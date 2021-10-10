const router = require("express").Router();
const { getAll, postOne } = require("../controllers/todo.controller");

// all routes for todos
router.get("/todo", getAll);
router.post("/todo", postOne);
// router.get("/todo/:id");
// router.put("/todo/:id");
// router.delete("/todo/:id");

module.exports = router;

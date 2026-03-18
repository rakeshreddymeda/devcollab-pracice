const express = require("express");

const auth = require("../middleware/authMiddleware");
const { createTask, updateTaskStatus, getTasks, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, createTask);
router.put("/:id", auth, updateTaskStatus);
router.get("/:projectId", auth, getTasks);
router.delete("/:id", auth, deleteTask);

module.exports = router;

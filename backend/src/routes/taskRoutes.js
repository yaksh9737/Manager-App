const express = require("express");
const {
  createTask,
  getAllTasks,
  getUserTasks, // Import user-specific tasks
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task (authenticated users)
router.post("/", protect, createTask);

// Get all tasks (admin can view all, regular users see their own tasks)
router.get("/", protect, (req, res) => {
  if (req.user.role === "admin") {
    getAllTasks(req, res); // Admin sees all tasks
  } else {
    getUserTasks(req, res); // Regular users see their own tasks
  }
});

// **Fetch tasks for logged-in user**
router.get("/my-tasks", protect, getUserTasks);

// Update task (only admin or task creator)
router.put("/:id", protect, updateTask);

// Delete task (only admin or task creator)
router.delete("/:id", protect, deleteTask);

module.exports = router;

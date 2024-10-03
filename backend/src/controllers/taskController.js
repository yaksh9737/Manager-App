const Task = require("../models/taskModel");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, category, assignedTo, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      category,
      status: "pending", // Default status
      assignedTo,
      createdBy: req.user._id, // The user who is logged in and creating the task
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "username email")
      .populate("createdBy", "username email");
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Fetch tasks for the logged-in user
const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user tasks", error: error.message });
  }
};

// Update a task status or details
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { status, title, description, dueDate } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update task fields
    if (status) task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params; // Use id instead of taskId
  try {
    const task = await Task.findByIdAndDelete(id); // Use the correct parameter
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getUserTasks,
  updateTask,
  deleteTask,
};

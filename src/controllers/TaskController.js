// taskController.js
import { Task } from "../schemas/Task.js";
// Create a new task
export const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body)
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error: 'Task creation failed' });
	}
};

// Get all tasks
export const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tasks' });
	}
};

// Get a task by ID
export const getTaskById = async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch the task' });
	}
};

// Update a task by ID
export const updateTaskById = async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await Task.findByIdAndUpdate(taskId, req.body);
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}
		const updated = await Task.findById(taskId)
		res.json(updated);
	} catch (error) {
		res.status(500).json({ error: 'Failed to update the task' });
	}
};

// Delete a task by ID
export const deleteTaskById = async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await Task.findByIdAndDelete(taskId);
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}
		res.json({ message: 'Task deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete the task' });
	}
};


export const searchNFilter = async (req, res) => {
	try {
		// Initial aggregation pipeline
		const pipeline = [];

		// Search by title and description (if query parameters are provided)
		if (req.query.search) {
			console.log(req.query.search)
			pipeline.push({
				$match: {
					$or: [
						{ title: { $regex: req.query.search, $options: 'i' } },
						{ description: { $regex: req.query.search, $options: 'i' } },
					],
				},
			});
		}

		// Filter by priority (if query parameter is provided)
		if (req.query.priority) {
			pipeline.push({
				$match: {
					priority: req.query.priority,
				},
			});
		}

		// Filter by status (if query parameter is provided)
		if (req.query.status) {
			pipeline.push({
				$match: {
					status: req.query.status,
				},
			});
		}

		// Sort tasks (if query parameters are provided)
		if (req.query.sortBy && req.query.sortOrder) {
			const sortField = req.query.sortBy;
			const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
			pipeline.push({
				$sort: {
					[sortField]: sortOrder,
				},
			});
		}

		const tasks = await Task.aggregate(pipeline);

		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};
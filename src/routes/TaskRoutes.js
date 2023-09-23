import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById, searchNFilter } from "../controllers/TaskController.js";
import { checkLoggedIn } from "../middleware/checkLogin.js";

export const taskRouter = Router();

taskRouter.get('/create', (req, res) => {

	res.render('createtask')
})
taskRouter.get('/search', checkLoggedIn, searchNFilter)
taskRouter.post('/', checkLoggedIn, createTask)
taskRouter.get('/', checkLoggedIn, getAllTasks)
taskRouter.get('/:id', checkLoggedIn, getTaskById)
taskRouter.patch('/:id', checkLoggedIn, updateTaskById)
taskRouter.delete('/:id', checkLoggedIn, deleteTaskById)


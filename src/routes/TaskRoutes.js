import { Router } from 'express'
import { TaskController } from '../controllers/TaskController.js';

const controller = new TaskController()
export const taskRouter = Router();

taskRouter.get('/', controller.goToTaskCreate)

taskRouter.post('/create', controller.create)

taskRouter.get('/update/:id', controller.getUpdateForm)

taskRouter.post('/updateForm/:id', controller.postUpdateForm)
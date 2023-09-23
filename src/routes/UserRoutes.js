import { Router } from 'express'
import { UserController } from '../controllers/UserController.js';

const controller = new UserController()
export const userRouter = Router();

// Pointing references towards userController methods

userRouter.post('/signup', controller.signup);
userRouter.post('/login', controller.login);
userRouter.get('/logout', controller.logout);
userRouter.get('/signup', (req, res) => {
	res.render('signup')
})
userRouter.get('/login', (req, res) => {
	res.render('login')
})
userRouter.get('/dashboard', (req, res) => {
	res.render('dashboard')
})
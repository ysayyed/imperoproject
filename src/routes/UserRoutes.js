import { Router } from 'express'
import { UserController } from '../controllers/UserController.js';
const controller = new UserController()

export const userRouter = Router();


userRouter.get('/', controller.home)

userRouter.post('/signin', controller.signin)

userRouter.get('/login', controller.login)
userRouter.get('/signup', controller.signup)

userRouter.get('/dashboard', controller.dashboard)

userRouter.post('/register', controller.register)

userRouter.get('/task', async (req, res, next) => {
	next();
})

userRouter.post('/logout', (req, res) => {
	res.status(200)
	res.clearCookie('jwt')
	res.redirect("/")
})
import { User } from '../schemas/User.js';
import { Task } from '../schemas/Task.js';
import Jwt from 'jsonwebtoken';

async function createToken(id, email) {
	const maxAge = 3 * 24 * 60 * 60;
	return await Jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: maxAge
	});
};

export class UserController {
	async home(req, res) {
		res.status(200)
		res.render('home')
	}

	async signin(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.login(email, password)
			if (user) {
				const token = await createToken(user._id, user.email);
				res.cookie('jwt', token)
				res.status(200)
				res.redirect('/dashboard')
			}
		}
		catch (error) {
			res.status(400)
			res.render('errorpage', { error })
		}
	}
	async login(req, res) {
		res.status(200)
		res.render('login')
	}
	async signup(req, res) {
		res.status(200)
		res.render('signup')
	}
	async dashboard(req, res) {
		const token = req.cookies.jwt
		if (token) {
			res.status(200)
			const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById({ _id: decoded.id })
			const tasks = await Task.find({ createdBy: user._id }).sort({ dueDate: -1 })
			res.render('dashboard', { user: user.name, tasks })
		}
		else {
			res.redirect('/login')
		}
	}

	async register(req, res) {
		try {
			const user = await User.create(req.body);
			res.status(201)
			res.redirect('/login')
		}
		catch (error) {
			res.status(422)
			res.render('errorpage', { error })
		}
	}
}
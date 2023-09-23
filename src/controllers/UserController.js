import { User } from '../schemas/User.js';
import { Task } from '../schemas/Task.js';
import Jwt from 'jsonwebtoken';

async function createToken(id, email) {
	console.log(id, email)
	const maxAge = 3 * 24 * 60 * 60;
	return await Jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: maxAge
	});
};

export class UserController {

	// create json web token

	// User Signup 
	async signup(req, res, next) {
		try {
			const user = await User.create(req.body);
			const token = await createToken(user._id, user.email);
			console.log(token)
			res.status(201).json({ user, token });
		}
		catch (error) {
			next(error)
		}

	}

	async login(req, res, next) {
		const { email, password } = req.body;

		try {
			const user = await User.login(email, password);
			const token = await createToken(user._id, user.email);
			const maxAge = 3 * 24 * 60 * 60;
			const tasks = await Task.find({ createdBy: user._id })
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.render('dashboard', { user, tasks })
			res.status(200).json({ user, token });
		}
		catch (error) {
			next(error)
		}

	}

	async logout(req, res) {
		res.cookie('jwt', '', { maxAge: 1 });
		res.status(200).send({ message: "Logged out!" })
	}

}
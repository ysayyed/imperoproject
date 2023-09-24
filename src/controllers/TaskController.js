import { User } from '../schemas/User.js';
import { Task } from '../schemas/Task.js';
import Jwt from 'jsonwebtoken';
import { io } from '../app.js';

export class TaskController {
	async goToTaskCreate(req, res) {
		const token = req.cookies.jwt;
		if (token) {
			try {
				const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
				const users = await User.find({ _id: { $ne: decoded.id } });
				const createdBy = await User.findById({ _id: decoded.id })
				res.status(200)
				res.render('createtask', { users, createdBy })
			}
			catch (error) {
				res.status(400)
				res.render('errorpage', { error })
			}
		}
		else {
			res.redirect('/login')
		}
	}

	async create(req, res) {
		const token = req.cookies.jwt;
		if (token) {
			try {
				const tasks = await Task.create(req.body)
				res.status(201)
				io.emit('Created')
				setTimeout(() => { res.redirect('/dashboard') }, 1000)
			}
			catch (error) {
				res.status(422)
				res.render('errorpage', { error })
			}
		}
		else {
			redirect('/login')
		}
	}

	async getUpdateForm(req, res) {
		const token = req.cookies.jwt;
		if (token) {
			try {
				const id = (req.params.id)
				let task = await Task.findById(id)
				const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
				const users = await User.find({ _id: { $ne: decoded.id } });
				const createdBy = await User.findById({ _id: decoded.id })
				res.render('updatetask', { users, task, createdBy, id })
			}
			catch (error) {
				res.status(400)
				res.render('errorpage', { error })
			}
		}
		else {
			redirect('/login')
		}
	}

	async postUpdateForm(req, res) {
		const token = req.cookies.jwt;
		if (token) {

			try {
				const id = req.params.id
				const data = req.body
				const task = await Task.updateOne({ _id: id }, {
					title: data.title,
					description: data.description,
					priority: data.priority,
					dueDate: data.dueDate,
					category: data.category,
					status: data.status,
					notes: data.notes,
					attachments: data.attachments,
					createdBy: data.createdBy
				})
				res.status(200)
				io.emit('Updated')
				res.redirect('/dashboard')
			}
			catch (error) {
				res.status(422)
				res.render('errorpage', { error })
			}
		}
		else {
			redirect('/login')
		}
	}

}
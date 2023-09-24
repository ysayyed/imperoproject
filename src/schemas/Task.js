import { Schema, model } from 'mongoose'
const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	priority: {
		type: String,
		enum: ['high', 'medium', 'low'],
		default: 'medium',
		required: true,

	},
	dueDate: {
		type: Date,
		required: true,
	},
	category: String,
	status: {
		type: String,
		enum: ['to-do', 'in progress', 'completed'],
		default: 'to-do',
		required: true
	},
	notes: [String], // Store notes as an array of strings
	attachments: [String], // Store file URLs or references
	collaborators: [{
		type: Schema.Types.ObjectId,
		ref: 'User', // Reference to User model for collaborators
	}],
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User', // Reference to User model for the task creator
		required: true,
	},
}, { timestamps: true, versionKey: false });

export const Task = model('Task', taskSchema);


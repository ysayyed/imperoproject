import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config();
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/UserRoutes.js';
import { taskRouter } from './routes/TaskRoutes.js';
import { Server } from 'socket.io'
import { createServer } from 'node:http';
import { Task } from './schemas/Task.js';

const app = express();

const server = createServer(app);
export const io = new Server(server)


app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', userRouter)
app.use('/task', taskRouter)


io.on('connection', function (socket) {
	console.log("Socket connection established.")

	socket.on('deleteTask', async (data) => {
		const { index } = data
		const task = await Task.deleteOne({ _id: index })
		io.emit('Deleted', { index })

	})
})

mongoose.connect(process.env.DATABASE_URL).then(() => {
	console.log("DB connected")
})

server.listen(3000, () => {
	console.log("Server is running on port 3000")
})
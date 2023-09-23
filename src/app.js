import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { userRouter } from './routes/UserRoutes.js';
import { taskRouter } from './routes/TaskRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path'
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', (req, res) => {
	res.render('signup')

})
app.use('/user', userRouter)
app.use('/task', taskRouter)

app.use(errorHandler)


mongoose.connect(process.env.DATABASE_URL).then(() => {
	console.log("DB connected")
})

app.listen(3000, () => {
	console.log("Server is running on port 3000")
})
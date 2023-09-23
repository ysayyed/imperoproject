// authMiddleware.js
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'
import { User } from '../schemas/User.js';
config();

export const checkLoggedIn = async (req, res, next) => {
	let token = req.header('Authorization');
	token = token.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ error: 'Access Denied - No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(401).json({ error: 'Invalid token - User not found' });
		}

		req.user = user; // Attach the user object to the request for further use
		next(); // Proceed to the next middleware or route handler
	} catch (error) {
		return res.status(403).json({ error: 'Invalid token' });
	}
};
